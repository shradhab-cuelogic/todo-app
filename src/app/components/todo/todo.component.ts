import { AfterViewInit, Component, createPlatform, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { TodolistComponent } from '../todolist/todolist.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, AfterViewInit {

  @ViewChild(TodolistComponent, { static: true }) todolistComponentObj: TodolistComponent;
  todoForm: FormGroup;
  todoData = [
    { name: 'eat', value: 'Eat' },
    { name: 'sleep', value: 'Sleep' },
    { name: 'repeat', value: 'Repeat' }
  ];
  isEdit = false;
  reminderChecked = false;
  min = new Date();
  todoItemId = '';
  tempObj: any;
  formData:any;
  constructor(private fb: FormBuilder, private todoService: TodoService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.createTodoForm();
    this.todoService.isEditTodo.subscribe(val => {
      this.isEdit = val;
    });
    if (this.isEdit) {
      this.updateTodo();
    }

  }

  ngAfterViewInit() {
    this.todolistComponentObj?.getTodoList();
  }
  createTodoForm() {
    this.todoForm = this.fb.group({
      date: [new Date(), Validators.required],
      listOfTodo: new FormArray([]),
      title: ['', Validators.required],
      reminderDate: [''],
      isReminder: [false]
    });
    this.addCheckboxes();
  }

  get getListArray() {
    return this.todoForm.controls.listOfTodo as FormArray;
  }

  addCheckboxes() {
    this.todoData.forEach(() => {
      this.getListArray.push(new FormControl(false));
    })
  }

  onSubmit() {
    //this.getReminderDate(this.todoForm.value.reminderDate);
    if(this.isEdit) {
      this.todoService.todoDataId.subscribe(itemId=>{
        this.todoService.getTodoObj(itemId).subscribe((res: any) => {
          const itemId = Object.keys(res)[0];
          console.log(res[itemId])
          const categoryValue = this.getSelectedCheckboxValue();
            this.todoService.updateTodoItem({ ...res[itemId], ...this.todoForm.value, listOfTodo: categoryValue}, itemId)
            .subscribe(res=>{
              this.openSnackBar();
            });
        })
      })

    } else {
      const value = this.getSelectedCheckboxValue();
      const todoFormValue = { ...this.todoForm.value, listOfTodo: value };
      console.log(todoFormValue);
      this.createTodoList(todoFormValue);
    }
   
  }

  getSelectedCheckboxValue() {
    const selectedName = this.todoForm.controls.listOfTodo.value
      .map((item: any, i: number) =>
        item ? this.todoData[i].value : null
      ).filter((item: any) => item !== null);
    console.log(selectedName)
    return selectedName;
  }

  createTodoList(todoObj: any) {
    this.todoService.createTodoList(todoObj)
      .subscribe(resp => {
        console.log('resp from todo', resp)
      },
        error => {
          console.log('error from todo', error);
        })
  }

  isReminderChecked(event: any) {
    console.log('EVENT FROM TOGGLE', event.checked)
    this.reminderChecked = event.checked;
    this.todoForm.patchValue({
      isReminder: this.reminderChecked ? true : false
    })
  }

  updateTodo() {
    console.log('ISEDIT', this.isEdit);
    this.todoService.todoDataId.subscribe(val => {
      this.todoItemId = val;
    })
    this.todoService.getTodoObj(this.todoItemId).subscribe(res => {
      this.tempObj = res
      const key = Object.keys(this.tempObj);
      this.formData = key.map(item => this.tempObj[item]);
      console.log(this.formData)
      this.todoForm.patchValue({
        title:  this.formData[0]?.title,
        isReminder:  this.formData[0]?.isReminder,
        listOfTodo:  this.formData[0]?.listOfTodo,
        reminderDate:  this.formData[0]?.reminderDate
      })
    })
    console.log(this.todoForm.value)

  }
  
  resetForm() {
    this.todoForm.reset();
  }

  
  openSnackBar() {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open('Item Updated Successfully', 'End Now', {
      duration: 500,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    })
  }
}
