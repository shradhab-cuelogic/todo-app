import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';


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

  // user: Observable<firebase>;

  constructor(
    public afAuth: AngularFireAuth, //inject firebase auth service
    public router: Router,
    public http: HttpClient
  ) { }
    errorMessage = '';
  signUp(userObj: any) {
    //  {email, password} = userObj; 
    console.log('USEROBJ', userObj)
    this.afAuth.createUserWithEmailAndPassword(userObj.email,userObj.password)
    .then( res=> {
      console.log('Success', res);
      delete userObj.password
      console.log('USER OBJ AFTER DELETIION', userObj);
      this.createUser(userObj);
      this.router.navigate(['profilepage']);
    } ) 
    .catch( error=> {
      console.log(error, error.message);
      this.errorMessage = error.message;
      console.log('this.error', this.errorMessage);
    } )
  }

  signIn(email:string, password:string) {
    this.afAuth.signInWithEmailAndPassword(email,password)
    .then( res=> {
      console.log('Login successfull', res);
      this.router.navigate(['todo']);
    } )
    .catch()
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
