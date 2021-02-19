import { ChangeDetectorRef } from '@angular/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SigninComponent } from '../signin/signin.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild(SigninComponent) userData: SigninComponent;

  constructor( private authService: AuthService, private router: Router) { }
  userSub: Subscription;
  isAuthenticated: boolean = false;
  ngOnInit(): void {
    this.userSub = this.authService.userData.subscribe(authFlag => {
      this.isAuthenticated = authFlag
    });
  }
  ngAfterViewInit() {
    // this.isAuthenticated = this.userData.isAuthenticated;
    // console.log('this.isAuth', this.isAuthenticated);
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  logout() {
    console.log('logout')
    this.authService.userData.next(false);
    localStorage.clear();
    this.router.navigate(['signin'])
  }
  navigateDashboard() {
    this.router.navigate(['tododashboard'])
  }
}
