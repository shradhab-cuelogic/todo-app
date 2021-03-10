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
  styleUrls: ['./todo.component.css'],
  providers: [TodolistComponent]
})
export class TodoComponent implements OnInit, AfterViewInit {

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
  formData: any;
  isReminder: any;
  imageUrl: any;
  image: any;
  constructor(private fb: FormBuilder,
     private todoService: TodoService,
     private snackBar: MatSnackBar,
     private todolistComponentObj: TodolistComponent) {
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
    this.todolistComponentObj.getTodoList();
  }

  createTodoForm() {
    this.todoForm = this.fb.group({
      date: [new Date(), Validators.required],
      listOfTodo: new FormArray([]),
      title: ['', Validators.required],
      reminderDate: [''],
      isReminder: [false],
      todoImage: [null]
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
    if (this.isEdit) {
      this.todoService.todoDataId.subscribe(itemId => {
        this.todoService.getTodoObj(itemId).subscribe((res: any) => {
          const itemId = Object.keys(res)[0];
          console.log(res[itemId])
          const categoryValue = this.getSelectedCheckboxValue();
          this.todoService.updateTodoItem({ ...res[itemId], ...this.todoForm.value, listOfTodo: categoryValue }, itemId)
            .subscribe(res => {
              this.openSnackBar();
              this.ngAfterViewInit();
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
    this.reminderChecked = event.checked;
    this.todoForm.patchValue({
      isReminder: this.reminderChecked ? true : false
    })
  }

  updateTodo() {
    this.todoService.todoDataId.subscribe(val => {
      this.todoItemId = val;
    })
    this.todoService.getTodoObj(this.todoItemId).subscribe(res => {
      this.tempObj = res
      const key = Object.keys(this.tempObj);
      this.formData = key.map(item => this.tempObj[item]);
      this.isReminder = this.formData[0].isReminder;
      this.image = this.formData[0].todoImage;
      this.todoForm.patchValue({
        title: this.formData[0]?.title,
        isReminder: this.formData[0]?.isReminder,
        listOfTodo: this.formData[0]?.listOfTodo,
        reminderDate: this.formData[0]?.reminderDate,
        todoImage: this.formData[0]?.todoImage
      })
    })

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

  onClose() {
    console.log('From Close');

  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    let reader = new FileReader();
    if(event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.todoForm.patchValue({
          todoImage: this.imageUrl 
        })
      }
    }
  }

}
