import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilepageService } from 'src/app/services/profilepage.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { EditdialogComponent } from '../editdialog/editdialog.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})

export class ProfilepageComponent implements OnInit {
  
  constructor(public profilePageService: ProfilepageService,
     private router: Router, 
     public dialog: MatDialog,
     public authService: AuthService,
     private routeParam: ActivatedRoute) {
  }
  userData: any;
  userKey: string;
  isLoading: boolean =  true;
  dialogRef: any;
  ngOnInit(): void {
    this.getUserData()
    console.log(this.routeParam.snapshot)
  }

  getUserData() {
      const email: any = localStorage.getItem('email');
      this.profilePageService.getUserInfo(email).subscribe( res =>{
        console.log('res from profile', res);
        this.isLoading = false;
        this.userKey = Object.keys(res)[0];
        this.authService.userKey.next(this.userKey);
        const response: any = res
        const userDataKey: any = Object.keys(response);
        this.userData = response[userDataKey[0]];
        this.authService.editUserData.next(this.userData);
        console.log(this.userData);
        //localStorage.setItem('userdata', JSON.stringify(this.userData))
      }, error=>{
        console.log('error', error);
      })  
  }
  
  onEdit(){
    this.dialogRef = this.dialog.open(EditdialogComponent, {panelClass: "foo"});
    this.authService.editUser.next(true);
    this.dialogRef.afterClosed().subscribe( (res: any) => {
      console.log('After close', res)
      this.getUserData();
    })
  }

  onClose() {
   // this.dialogRef.close();
    this.dialog.closeAll()
  }
}
