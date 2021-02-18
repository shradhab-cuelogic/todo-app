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
  list: any = [];
  categories: any = [];
  openDialog() {
    this.dialog.open(TododialogComponent);
    const dialogRef = this.dialog.open(TododialogComponent)
    dialogRef.afterClosed().subscribe( res=> {
      console.log(res)
      this.getTodoList();
    })
    console.log('OPEN')
  } 

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.todoListService.getTodoList().subscribe( res => {
      const data:any = res
      const keys = Object.keys(res);

      this.list = keys.map( item => data[item])
      //this.categories = this.list.map( (item: any) => item.listOfTodo)
     
      // const newObj = {
      //   date: this.list.date,
      //   categories: this.categories
      // }

      console.log( 'new obj', this.list[0].listOfTodo);


    }, error=>{
      console.log('ERROR', error);
    })
  }
}
