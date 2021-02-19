import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  signinForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  userToken: any;
  isAuthenticated = false;
  testMessage: string = 'Helloo'
  ngOnInit(): void {
  }
  onSubmit() {
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
      this.isAuthenticated = true;
      this.authService.userData.next(this.isAuthenticated);
      const userData: any = res;
      const email = userData.email;
      this.userToken = userData.idToken

      localStorage.setItem('userToken', this.userToken)
      localStorage.setItem('email', email);
      this.router.navigate(['tododashboard']);
    }, error=>{
      console.log('ERROR', error);
    })
  }
}
