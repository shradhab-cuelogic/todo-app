import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';

interface TodoList {
  date: string,
  categories: [],
  isDone: boolean,
  isPending: boolean 
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public httpClient: HttpClient) { }
  todoData = new BehaviorSubject({});
  todoDataId = new BehaviorSubject('');
  isEditTodo = new BehaviorSubject(false);

  createTodoList(todoObj: any) {
    const email = localStorage.getItem('email');
    const updatedTodoObj = {...todoObj, email, id: uuidv4()};
    console.log('From create', updatedTodoObj)
    return this.httpClient.post<TodoList>('https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json', updatedTodoObj)
  }

  getTodoList() {
    const email = localStorage.getItem('email');
    return this.httpClient.get(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json?orderBy="email"&equalTo="${email}"`);
  }

  deleteTodolist(key:string) {
    console.log('KEY FROM DELETE',key)
    return this.httpClient.delete(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos/${key}.json`);
  }

  getObjToDelete(id: string) {
    return this.httpClient.get(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json?orderBy="id"&equalTo="${id}"`);
  }

  getTodoObj(id: string) {
    return this.httpClient.get(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json?orderBy="id"&equalTo="${id}"`);
  }

  updateTodoItem(updatedObj: any, key: string) {
    console.log('From update', updatedObj);
   return this.httpClient.put(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos/${key}.json`, {...updatedObj})
  }
}
