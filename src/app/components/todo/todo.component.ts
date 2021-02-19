import { Component, createPlatform, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormControl, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  todoData = [
    { name: 'eat', value: 'Eat' },
    { name: 'sleep', value: 'Sleep' },
  ]
  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      date: [],
      listOfTodo: new FormArray([]),
      title: []
    });
    this.addCheckboxes();
  }
 
  ngOnInit(): void {
  }
 
  get getListArray() {
    return this.todoForm.controls.listOfTodo as FormArray;
  }

  addCheckboxes() {
    this.todoData.forEach(()=> {
      this.getListArray.push(new FormControl(false));
    })
  }

  onSubmit() {
    const value = this.getSelectedCheckboxValue();
    const todoFormValue = {...this.todoForm.value, listOfTodo: value};
    console.log(todoFormValue);
    this.createTodoList(todoFormValue);
  }

  getSelectedCheckboxValue() {
     const selectedName = this.todoForm.controls.listOfTodo.value
     .map(( item:any, i: number ) => 
         item ? this.todoData[i].value : null 
     ).filter((item:any) => item !==null );
     console.log(selectedName)
     return selectedName;
  }
  // addTodoList() {
  //   const arr = this.listOfTodo.map(ele=>{
  //     return this.fb.control(false);
  //   })
  //   return this.fb.array(arr);
  // }

  // getTodoList() {
  //   return <FormArray>this.todoForm.get('listOfTodo');
  // }

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
