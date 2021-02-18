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

  openDialog() {
    this.dialog.open(TododialogComponent);
    const dialogRef = this.dialog.open(TododialogComponent)
    dialogRef.afterClosed().subscribe( res=> {
      this.getTodoList();
    })
  } 

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.todoListService.getTodoList().subscribe( res => {
      const data:any = res
      const keys = Object.keys(res);

      this.list = keys.map( item => data[item]);

    }, error=>{
      console.log('ERROR', error);
    })
  }
}
