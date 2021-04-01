import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import {AuthService} from '../app/services/auth.service';
import { TodoComponent } from './components/todo/todo.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TododialogComponent } from './components/tododialog/tododialog.component';
import { SearchComponent } from './components/search/search.component';
import { EditdialogComponent } from './components/editdialog/editdialog.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './services/authGaurd';
import { TestingAuthComponent } from './components/testing-auth/testing-auth.component';
import { AppMaterialModule } from './modules/core-module/app-material.module';
import { AppFirebaseModule } from './modules/core-module/app-firebase.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent,
    ProfilepageComponent,
    TodoComponent,
    LoadingSpinnerComponent,
    TodolistComponent,
    TododialogComponent,
    SearchComponent,
    EditdialogComponent,
    PagenotfoundComponent,
    TestingAuthComponent
  ],
  entryComponents: [TododialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    AppFirebaseModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
