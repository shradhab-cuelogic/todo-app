import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }
  signinForm = this.fb.group({
    email: [],
    password: []
  })
  ngOnInit(): void {
  }
  onSubmit() {
    console.log('SignIn', this.signinForm.value);
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.authService.signIn(email, password);
    this.signinForm.reset();
  }
}
