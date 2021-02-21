import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodolistComponent } from '../components/todolist/todolist.component';

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

  createTodoList(todoObj: any) {
    const email = localStorage.getItem('email');
    const updatedTodoObj = {...todoObj, email}
    return this.httpClient.post<TodoList>('https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json', updatedTodoObj)
  }

  getTodoList() {
    const email = localStorage.getItem('email');
    return this.httpClient.get(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json?orderBy="email"&equalTo="${email}"`);
  }

  deleteTodolist(key:string) {
    return this.httpClient.delete(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos/${key}`);
  }
}
