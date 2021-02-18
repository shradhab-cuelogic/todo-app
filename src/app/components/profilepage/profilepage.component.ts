import { Component, OnInit } from '@angular/core';
import { ProfilepageService } from 'src/app/services/profilepage.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  constructor(public profilePageService: ProfilepageService) {

   }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.profilePageService.getUserInfo()
    .subscribe(res=>{
      console.log('RES', res)
    },
    error=>{
      console.log('ERROR')
    })
  }

}
