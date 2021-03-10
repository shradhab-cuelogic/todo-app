import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfilepageService } from 'src/app/services/profilepage.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private profilePageService: ProfilepageService) { }
  signinForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  userToken: any;
  isAuthenticated = false;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.logInUSer(email,password); 
    this.resetForm();
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  resetForm() {
    this.signinForm.reset();
  }

  logInUSer(email: string, password: string) {
    this.authService.signIn(email, password).subscribe(res=>{
      this.isLoading = false;
      this.isAuthenticated = true;
      this.authService.userData.next(this.isAuthenticated);
     
      const userData: any = res;
      const email = userData.email;
      this.getUserData(email);
      this.userToken = userData.idToken
     
      localStorage.setItem('userToken', this.userToken)
      localStorage.setItem('email', email);
      this.router.navigate(['tododashboard']);
    }, error=>{
      this.isLoading = false;
      this.errorMessage = error
    })
  }

  getUserData(email: string) {
    this.profilePageService.getUserInfo(email).subscribe(res=>{
      const data: any = res
      const keys = Object.keys(data);
      const list = keys.map(item=>{ return data[item] })
      localStorage.setItem('userId', list[0].id)
    })
  }
}
