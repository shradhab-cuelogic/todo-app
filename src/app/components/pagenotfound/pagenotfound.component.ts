import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  template: `
    <div class="imgPos"><img mat-card-image src="assets/404_page_cover.jpg"/></div>
  `,
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }
  imgSrc = 'src/assets/404_page_cover.jpg'
  ngOnInit(): void {
  }

}
