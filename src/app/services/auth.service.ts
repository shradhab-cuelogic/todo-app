import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import * as environment from '../../environments/environment';
import { catchError } from 'rxjs/operators';
interface User {
  fname: string,
  lname: string,
  email: string,
  address: string,
  gender: string,
  profileImage: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(
    localStorage.getItem('userToken') ? true : false
  );
  editUser = new BehaviorSubject(false);
  editUserData = new BehaviorSubject(Object);
  userKey = new BehaviorSubject('');
  onClose = new BehaviorSubject(false);
  error = ''
  constructor(
    public afAuth: AngularFireAuth, //inject firebase auth service
    public router: Router,
    public http: HttpClient
  ) { }
    errorMessage = '';

  signUp(userObj: any) {
    this.afAuth.createUserWithEmailAndPassword(userObj.email,userObj.password)
    .then( res=> {
      console.log('Success', res);
      delete userObj.password;
      delete userObj.confirm_password;

      const response: any = this.createUser(userObj);
      this.editUserData.next(response);
      console.log('response', response);
      this.router.navigate(['signin']);
    }) 
    .catch( error=> {
      this.errorMessage = error.message;
    })
  }

  signIn(email:string, password:string) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.environment.firebase.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorResponse=>{
      this.error = 'An unknown error occured!'
      if(!errorResponse.error || !errorResponse.error.error) {
        return throwError(this.error);
      }
      switch(errorResponse.error.error.message) {
        case 'EAMIL_EXISTS': 
        this.error = 'This Email already exists';
        break;
        case 'INVALID_PASSWORD': 
        this.error = "Invalid Password, please enter a valid password!";
        break;
        case 'EMAIL_NOT_FOUND':
        this.error = "This email does not exist, please signup!"
      }
      return throwError(this.error)
    }))
  }

  createUser(userObj: Object) {
    const updatedObj = { ...userObj, id: uuidv4()}
    fetch(`${environment.environment.firebase.url}/users.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedObj)
    })
    .then( res=> {
     return res.json();
    })
    .then(res => {
      return res;
     // console.log('res', res)
    })
    .catch()
  }

  updateUSer(userObj: any) {
    let key = '';
    this.userKey.subscribe(res=>{
       key = res
    }) 
    return this.http.put(`${environment.environment.firebase.url}/users/${key}.json`, {
      ...userObj
    })
  }

  deleteUser(key: string) {
    return this.http.delete(`${environment.environment.firebase.url}/users/${key}.json`)
  }

}
