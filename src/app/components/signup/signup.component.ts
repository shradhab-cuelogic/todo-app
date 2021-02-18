import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms'; 
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
    confirm_password:['', Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    address: ['', Validators.required],
    profilePicture: [''],
    gender: ['']
  })
  isLoading = false;
  errorMessage = ''
  ngOnInit(): void {
  }


  onSubmit() {
    this.isLoading = true;
   if(this.signupForm.value.password === this.signupForm.value.confirm_password) {
    this.authService.signUp(this.signupForm.value);
    this.isLoading = false;
    this.resetForm();
   } else {
     this.isLoading = false;
   }
  ;
  }

  resetForm() {
    this.signupForm.reset()
  }

  get fname() {
    return this.signupForm.get('fname');
  }

  get lname() {
    return this.signupForm.get('lname');
  }

  get address() {
    return this.signupForm.get('address');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirm_password');
  }
}

