import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user: Observable<firebase>;

  constructor(
    public afAuth: AngularFireAuth, //inject firebase auth service
    public router: Router
  ) { }

  signUp(email: string, password:string) {
    this.afAuth.createUserWithEmailAndPassword(email,password)
    .then( res=> {
      console.log('Success', res);
      this.router.navigate(['profilepage']);
    } ) 
    .catch()
  }

  signIn(email:string, password:string) {
    this.afAuth.signInWithEmailAndPassword(email,password)
    .then( res=> {
      console.log('Login successfull', res);
      this.router.navigate(['todo']);
    } )
    .catch()
  }

}
