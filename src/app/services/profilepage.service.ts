import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class ProfilepageService {

  constructor(public httpClient: HttpClient) { }
  // https://dinosaur-facts.firebaseio.com/dinosaurs.json?orderBy="height"&startAt=3&print=pretty

  getUserInfo() {
    return this.httpClient
    .get('https://todo-app-a6fc9-default-rtdb.firebaseio.com/users.json?orderBy="email"&startAt="testing222@gmail.com"')
  }
}
