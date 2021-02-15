import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TodoList {
  date: string, 
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public httpClient: HttpClient) { }

  createTodoList(todoObj: any) {
    console.log('From todo', todoObj);
    return this.httpClient.post<TodoList>('https://todo-app-a6fc9-default-rtdb.firebaseio.com/todos.json ', todoObj)
  }
}
