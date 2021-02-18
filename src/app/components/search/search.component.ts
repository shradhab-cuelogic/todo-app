import { Component, Input, OnInit } from '@angular/core';
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
 
  myControl = new FormControl();
  options = ['Angular', 'React', 'Apple', 'Anchor', ];
  objectOptions = [
   {  name: 'Angular' },
   {  name: 'Apple' },
   {  name: 'anchor' },
   {  name: 'React' },
   {  name: 'React' },
  ]
  filteredOptions: Observable<string[]> | undefined;
  @Input() public parentData: any;
  ngOnInit(): void {
    console.log('PARENT', this.parentData)
    const data = this.parentData
    console.log('PARENT', data)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value=> this.filterValue(value) )
    )
  }

  filterValue(value: any) {
    console.log('PARENT', this.parentData)
    const filterValue = value.toLowerCase();
    return this.options.filter(item => 
      item.toLowerCase().includes(filterValue))
  }

  // onSearch(value: any) {
  //   console.log('Value', value);
  // }

  displayFn(subject: any) {
    return subject ? subject.name : undefined;
  }
}
