import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

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

  userData = new BehaviorSubject(false);

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
      delete userObj.password
      console.log('USER OBJ AFTER DELETIION', userObj);
      this.createUser(userObj);
      this.router.navigate(['signin']);
    } ) 
    .catch( error=> {
      console.log(error, error.message);
      this.errorMessage = error.message;
      console.log('this.error', this.errorMessage);
    } )
  }

  signIn(email:string, password:string) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBukyd8fZDl9214yRUAQaLjasrZaU8e7Ik', {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  createUser(userObj: Object) {
    console.log('servie', userObj)
    // return this.http.post<User>('https://todo-app-a6fc9-default-rtdb.firebaseio.com/users.json', {userObj})
    fetch('https://todo-app-a6fc9-default-rtdb.firebaseio.com/users.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj)
    })
    .then( res=> {
     return res.json();
    })
    .then(res => {
      console.log('res', res)
    })
    .catch()
  }

}
