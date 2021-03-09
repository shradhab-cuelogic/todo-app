import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private todoList: TodoService) { }

  ngOnInit(): void {
    this.getTodolist();
  }

  getTodolist() {
    this.todoList.getTodoList().subscribe(res=>{
      console.log(res)
    },
    error=>{
      console.log(error)
    })
  }

}
