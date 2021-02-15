import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  listOfTodo: Array<String> = ['Eat', 'Sleep', 'Repeat'];
  ngOnInit(): void {
  }
  todoForm = this.fb.group({
    date: [],
    listOfTodo: this.addTodoList()
  })

  onSubmit() {
    console.log(this.todoForm)
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
}
