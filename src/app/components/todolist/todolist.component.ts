import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { TododialogComponent } from '../tododialog/tododialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  constructor(public dialog: MatDialog, private todoListService: TodoService, private snackBar: MatSnackBar) {
  }

  list: any = [];
  categories: any = [];
  listFromSearch: any = [];
  searchValueData: any;
  dialogRef: any;
  data: any;
  deletRecordId: string;
  isEditMode = false;
  todoItem: any;
  todoItemId: any;
 
  openDialog() {
    this.todoListService.isEditTodo.next(false);
    this.dialogRef = this.dialog.open(TododialogComponent, {panelClass: "todoListClass"});
    this.dialogRef.afterClosed().subscribe((res: any) => {
      this.getTodoList();
    })
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.todoListService.getTodoList().subscribe(res => {
      this.data = res
      const keys = Object.keys(res);
      this.list = keys.map(item => this.data[item]);
      
      this.todoListService.todoData.next(this.data);
    }, error => {
      console.log('ERROR', error);
    })
  }

  onEdit(id: string) {
    this.dialog.open(TododialogComponent, {panelClass: 'todoEdit'});
    this.todoListService.isEditTodo.next(true);
    this.todoListService.todoDataId.next(id);
    // this.dialogRef.afterClosed().subscribe((res: any) => {
    //   this.getTodoList();
    // });
  }

  searchValue() {
    if (this.searchValueData === '') {
      this.ngOnInit();
    } else {
      this.list = this.list.filter((item: any) => {
        return item.title.toLowerCase().match(this.searchValueData.toLowerCase());
      })
    }
  }

  onDelete(id: string) {
    this.todoListService.getObjToDelete(id).subscribe(res => {
      this.deletRecordId = Object.keys(res)[0];
      this.todoListService.deleteTodolist(this.deletRecordId).subscribe(res => {
        this.openSnackBar()
        this.getTodoList();
      },
        error => {
          console.log('ERROR', error);
        })
    })
   
  }

  openSnackBar() {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open('Item Deleted', 'End Now', {
      duration: 500,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    })
  }

}

