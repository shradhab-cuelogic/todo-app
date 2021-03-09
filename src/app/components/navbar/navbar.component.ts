import { ChangeDetectorRef, DoCheck, OnChanges } from '@angular/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SigninComponent } from '../signin/signin.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { ProfilepageService } from 'src/app/services/profilepage.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(SignupComponent) signUp: SignupComponent;

  constructor(private authService: AuthService, private router: Router, private profilePageService: ProfilepageService) { }
  userSub: Subscription;
  isAuthenticated: boolean = false;
  userData: any;
  userId: any;

  ngOnInit(): void {
    this.userSub = this.authService.userData.subscribe(authFlag => {
      this.isAuthenticated = authFlag;
    });

  }

  logout() {
    this.authService.userData.next(false);
    localStorage.clear();
    this.router.navigate(['signin'])
  }

  navigateDashboard() {
    this.router.navigate(['tododashboard'])
  }

  fetchUserData() {
    // const data: any = localStorage.getItem('userData');
    // Object.keys(data);
    this.userId = localStorage.getItem('userId')
    this.router.navigate(['profilepage', this.userId]);
  }
}
