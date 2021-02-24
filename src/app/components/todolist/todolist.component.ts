import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { TododialogComponent } from '../tododialog/tododialog.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  constructor(public dialog: MatDialog, private todoListService: TodoService) {
  }
  test = 'from parent';
  list: any = [];
  categories: any = [];
  listFromSearch: any = [];
  searchValueData: any;
  dialogRef: any;
  data: any;
  deletRecordId: string;
  isEditMode = false;
  openDialog() {
    this.dialogRef = this.dialog.open(TododialogComponent, {panelClass: "todoListClass"});
    //this.dialogRef = this.dialog.open(TododialogComponent)
    this.dialogRef.afterClosed().subscribe((res: any) => {
      this.getTodoList();
    })
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.todoListService.getTodoList().subscribe(res => {
      console.log('From todolist', res)
      this.data = res
      console.log('From todolist', this.data)
      const keys = Object.keys(res);

      this.list = keys.map(item => this.data[item]);
      console.log('From todolist', this.list)
      this.todoListService.todoData.next(this.data);
    }, error => {
      console.log('ERROR', error);
    })
  }

  onEdit(id: string) {
    // this.isEditMode = true;
    // this.todoListService.todoDataId.next(id);
    // this.todoListService.isEdit.next(true);
    // this.dialog.open(TododialogComponent);
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
        this.getTodoList();
      },
        error => {
          console.log('ERROR', error);
        })
    })

  }
}

