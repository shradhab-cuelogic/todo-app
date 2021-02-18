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
    return this.httpClient.post<TodoList>('https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json', todoObj)
  }

  getTodoList() {
    return this.httpClient.get('https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json');
  }
}
