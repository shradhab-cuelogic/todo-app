import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( public fb: FormBuilder) { }
 
  searchValueData: any;
  // options = ['Angular', 'React', 'Apple', 'Anchor', ];
  // objectOptions = [
  //  {  name: 'Angular' },
  //  {  name: 'Apple' },
  //  {  name: 'anchor' },
  //  {  name: 'React' },
  //  {  name: 'React' },
  // ]
  filteredOptions: Observable<string[]> | undefined;
  @Input() public parentData: any = [];
  @Output() public searchEvent = new EventEmitter();
  ngOnInit(): void {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value=> this.filterValue(value) )
    // )
  }

  // filterValue(value: any) {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(item => 
  //     item.toLowerCase().includes(filterValue))
  // }

 
  // displayFn(subject: any) {
  //   return subject ? subject.name : undefined;
  // }
  searchValue() {
    //console.log('EVENT', this.myControl.value);
  //   const searchValue = this.myControl.value;
  //   const data = this.parentData;
  //   console.log(searchValue, data);
  //  const list =  data.filter((item: any) => {
  //     if(item.title.toLowerCase() === searchValue.toLowerCase()) {
  //       return item;
  //     }
  //   })
  //   console.log('ELE FOund', list);
  //   this.searchEvent.emit(list)
  // }
  console.log(this.searchValueData)
  console.log(this.parentData)
  if(this.searchValueData === '') {
    
  }
  }
}
