import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { }
  
  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    address: ['', Validators.required],
    profilePicture: ['', Validators.required],
  })
  isLoading = false;
  ngOnInit(): void {
  }


  onSubmit() {
    // console.log('form', this.signupForm.value);
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.isLoading = true;
    this.authService.signUp(email, password);
    this.isLoading = false;
    this.signupForm.reset();
  }
}
