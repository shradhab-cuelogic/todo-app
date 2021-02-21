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

  userData = new BehaviorSubject(
    localStorage.getItem('userToken') ? true : false
  );
  editUser = new BehaviorSubject(false);
  editUserData = new BehaviorSubject(Object);
  userKey = new BehaviorSubject('');
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

      this.createUser(userObj);
      this.router.navigate(['signin']);
    } ) 
    .catch( error=> {
      this.errorMessage = error.message;
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

  updateUSer(userObj: any) {
    let key = '';
    this.userKey.subscribe(res=>{
       key = res
    })
    // const email = localStorage.getItem('email');
    // const updatedObj = {...userObj, email} 
    return this.http.put(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/users/${key}.json`, {
      ...userObj
    })
  }

  deleteUser(key: string) {
    return this.http.delete(`https://todo-app-a6fc9-default-rtdb.firebaseio.com/users/${key}.json`)
  }

}
