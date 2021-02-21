import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';
import { ProfilepageComponent } from '../profilepage/profilepage.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild(ProfilepageComponent) profilePage: ProfilepageComponent 

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
  errorMessage = '';
  isEdit= false;
  editUserData: any;
  ngOnInit(): void {
    this.authService.editUser.subscribe(val=>{
      this.isEdit = val;
    });
    this.authService.editUserData.subscribe(val=>{
      this.editUserData = val;
    });
    this.updateUser();
  }


  onSubmit() {
    if (this.isEdit) {
      console.log('form', this.signupForm);
      this.authService.updateUSer(this.signupForm.value).subscribe(res=>{
      },
      error=>{
        console.log(error);
      })
    } else {
      if (this.signupForm.value.password === this.signupForm.value.confirm_password) {
        this.authService.signUp(this.signupForm.value);
        this.isLoading = false;
        this.resetForm();
      }
    }
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
  updateUser() {
    this.signupForm.patchValue({
      fname: this.editUserData?.fname,
      lname: this.editUserData?.lname,
      email: this.editUserData?.email,
      profilePicture: this.editUserData?.profilePicture,
      address: this.editUserData?.address,
      gender: this.editUserData?.gender
    });
  }
}

