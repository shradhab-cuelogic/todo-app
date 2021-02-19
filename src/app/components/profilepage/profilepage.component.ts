import { Component, OnInit } from '@angular/core';
import { ProfilepageService } from 'src/app/services/profilepage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})

export class ProfilepageComponent implements OnInit {
  
  constructor(public profilePageService: ProfilepageService, private router: Router) {
  }
  userData: any
  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
      const email: any = localStorage.getItem('email');
      this.profilePageService.getUserInfo(email).subscribe( res =>{
        this.router.navigate(['profilepage'])
        const response: any = res
        const userDataKey: any = Object.keys(response);
        this.userData = response[userDataKey[0]];
      }, error=>{
        console.log('error', error);
      })  
  }

}
