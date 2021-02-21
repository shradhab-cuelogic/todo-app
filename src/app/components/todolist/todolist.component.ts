import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { TododialogComponent } from '../tododialog/tododialog.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  constructor( public dialog: MatDialog, private todoListService: TodoService )  {
   }
  test= 'from parent';
  list: any = [];
  categories: any = [];
  listFromSearch: any = [];
  searchValueData: any;
  dialogRef: any;
  data: any;
  deletRecordId: string;
  openDialog() {
    this.dialog.open(TododialogComponent);
    this.dialogRef = this.dialog.open(TododialogComponent)
    this.dialogRef.afterClosed().subscribe( (res: any)=> {
      //console.log(res);
      this.getTodoList();
    })
  } 

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.todoListService.getTodoList().subscribe( res => {
      this.data = res
      const keys = Object.keys(res);

      this.list = keys.map( item => this.data[item]);
      console.log(this.list);
    }, error=>{
      console.log('ERROR', error);
    })
  }

  onEdit(){
   // this.dialog.open(EditdialogComponent);
  }
  searchValue() {
  if(this.searchValueData === '') {
      this.ngOnInit();
  } else {
    this.list = this.list.filter((item: any)=>{
      // if(item.title.toLowerCase() === this.searchValueData.toLowerCase()) {
      //   console.log('item', item)
      //   return item;
      return item.title.toLowerCase().match(this.searchValueData.toLowerCase());
      })
    }
  }

  onDelete(id: string) {
    console.log(id);
    this.todoListService.getObjToDelete(id).subscribe(res=>{
      console.log(res)
          this.deletRecordId = Object.keys(res)[0];
          console.log(this.deletRecordId);
          this.todoListService.deleteTodolist(this.deletRecordId).subscribe(res=>{
            console.log('res', res);
            this.getTodoList();
          },
          error=>{
            console.log('ERROR', error);
          })
    })
   
  }
}

