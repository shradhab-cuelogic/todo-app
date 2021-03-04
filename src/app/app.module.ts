import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SearchComponent } from './components/search/search.component';
import { EditdialogComponent } from './components/editdialog/editdialog.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ContactComponent } from './app/components/contact/contact.component';
import { AuthGuard } from './services/authGaurd';
import { TestingAuthComponent } from './app/components/testing-auth/testing-auth.component';

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
    ContactComponent,
    TestingAuthComponent
  ],
  entryComponents: [TododialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatAutocompleteModule,
    FormsModule,
    MatGridListModule,
    HttpClientModule,
    MatSlideToggleModule,
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
