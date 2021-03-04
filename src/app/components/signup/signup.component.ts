import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';
import { ProfilepageComponent } from '../profilepage/profilepage.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild(ProfilepageComponent, {static: false}) profilePage: ProfilepageComponent 

  constructor(private fb: FormBuilder, private authService: AuthService,  private cd: ChangeDetectorRef) { }
  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password:['', Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    address: ['', Validators.required],
    profilePicture: [null],
    gender: [''],
  })
  errorMessage = '';
  isEdit= false;
  editUserData: any;
  imageUrl: any;
  isLoading = false;
  
  ngOnInit(): void {
    this.authService.editUser.subscribe(val=>{
      this.isEdit = val;
    });
    this.authService.editUserData.subscribe(val=>{
      this.editUserData = val;
    });
    if(this.isEdit) {
      this.updateUser();
    }
  }

  onSubmit() {
    this.isLoading = true; 
    if (this.isEdit) {
      console.log('form', this.signupForm);
      this.authService.updateUSer(this.signupForm.value).subscribe(res=>{
        this.isLoading = false;
      },
      error=>{
        console.log(error);
      })
    } else {
      console.log('FROM SIGNUP', this.signupForm.value, this.imageUrl);
      if (this.signupForm.value.password === this.signupForm.value.confirm_password) {
        this.authService.signUp(this.signupForm.value);
        this.resetForm();
      }
    }
  }
  onDialogclose() {
    this.profilePage.onClose();
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
    console.log(this.editUserData);
    this.signupForm.patchValue({
      fname: this.editUserData?.fname,
      lname: this.editUserData?.lname,
      email: this.editUserData?.email,
      profilePicture: this.editUserData?.profilePicture,
      address: this.editUserData?.address,
      gender: this.editUserData?.gender
    });
  }

  uploadFile(event: any) {
    console.log(event);
    let reader = new FileReader();
    let file = event.target.files[0];
    if(event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        console.log(this.imageUrl);
        this.signupForm.patchValue({
         profilePicture: this.imageUrl
        })
      }
    }
    this.cd.markForCheck();
  }
}

