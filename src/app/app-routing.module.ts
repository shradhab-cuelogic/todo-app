import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './app/components/contact/contact.component';
import { TestingAuthComponent } from './app/components/testing-auth/testing-auth.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { AuthGuard } from './services/authGaurd';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'profilepage/:id', component: ProfilepageComponent, canActivate: [ AuthGuard ]  },
  { path: 'todo', component: TodoComponent  },
  { path: 'tododashboard', component: TodolistComponent, canActivate: [ AuthGuard ]  },
  { path: 'contact', component: ContactComponent, canActivate: [ AuthGuard ]  },
  { path: 'testing', component: TestingAuthComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
