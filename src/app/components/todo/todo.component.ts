import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private fb: FormBuilder, private todoService: TodoService) { }
  listOfTodo: Array<String> = ['Eat', 'Sleep', 'Repeat'];
  ngOnInit(): void {
  }
  todoForm = this.fb.group({
    date: [''],
    listOfTodo: this.addTodoList()
  })

  onSubmit() {
    console.log('sssads', this.todoForm.value)
    this.createTodoList(this.todoForm.value);
  }

  addTodoList() {
    const arr = this.listOfTodo.map(ele=>{
      return this.fb.control(false);
    })
    return this.fb.array(arr);
  }

  getTodoList() {
    return <FormArray>this.todoForm.get('listOfTodo');
  }

  createTodoList(todoObj: any) {
    this.todoService.createTodoList(todoObj)
      .subscribe( resp => {
        console.log('resp from todo', resp)
      },
      error=> {
        console.log('error from todo', error);
      })
  }
}
