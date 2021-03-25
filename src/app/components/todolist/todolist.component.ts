import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { TododialogComponent } from '../tododialog/tododialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  constructor(public dialog: MatDialog, private todoListService: TodoService, private snackBar: MatSnackBar) {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

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
  filteredList: any;
  originalList: any;
  selectedValue: string;
  isEditable = false;
  arrowUpward: boolean = true;
  arrowDownward: boolean = false
  orderBy: any;
  sortFields = [
    {value: 'date', viewValue: 'Date'},
    {value: 'title', viewValue: 'Title'},
  ];
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
      this.originalList = this.list;
      this.todoListService.todoData.next(this.data);
      this.sortField('date', this.originalList, 'desc');

    }, error => {
      console.log('ERROR', error);
    })
  }

  onEdit(id: string) {
    this.dialog.open(TododialogComponent, {panelClass: 'todoEdit'});
    this.todoListService.isEditTodo.next(true);
    this.todoListService.todoDataId.next(id);
  }

  searchValue() {
    if (this.searchValueData === '') {
      this.list = this.originalList;
    } else {
      this.filteredList = this.originalList.filter((item: any) => {
        return item.title.toLowerCase().match(this.searchValueData.toLowerCase());
      })
      this.list = this.filteredList;
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

  onEditClick() {
    this.isEditable = !this.isEditable;
    console.log(this.isEditable);
    this.orderBy = !this.isEditable ? 'asc' : 'desc';
    console.log('THIS>ORDERBY', this.orderBy);
    this.sortField(this.selectedValue, this.originalList, this.orderBy);
  }

  getSortValue() {
    const key = this.selectedValue;
    console.log('this.orderBy', this.orderBy);
    //const orderBy = "desc";
    this.sortField(key, this.originalList, this.orderBy )
  }

  sortField(key:any, list:any, orderBy="asc") {
    const sortedList = list.sort(( item1: any, item2: any )=>{
      if(orderBy === 'asc') {
        return item1[key] < item2[key] ? -1 : 1
      } 
        return item1[key] > item2[key] ? -1 : 1
    })
    console.log('SORTEDLIST', sortedList)
    this.list = sortedList;
  }

  getDate() {
    console.log('helloo', this.originalList)
    // let date = ''
  return  this.originalList.map((item:any)=>{
      if(item.date !== new Date()) {
        return item.date
      }
      return 'today';
    })

  }
}

