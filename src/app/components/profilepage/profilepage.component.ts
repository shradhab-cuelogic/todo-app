import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilepageService } from 'src/app/services/profilepage.service';
import { Router } from '@angular/router';
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
     public authService: AuthService) {
  }
  userData: any;
  userKey: string;
  isLoading: boolean =  true;
  dialogRef: any;
  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
      const email: any = localStorage.getItem('email');
      this.profilePageService.getUserInfo(email).subscribe( res =>{
        this.isLoading = false;
        this.userKey = Object.keys(res)[0];
        this.authService.userKey.next(this.userKey);
        this.router.navigate(['profilepage']);
        const response: any = res
        const userDataKey: any = Object.keys(response);
        this.userData = response[userDataKey[0]];
        this.authService.editUserData.next(this.userData);
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
