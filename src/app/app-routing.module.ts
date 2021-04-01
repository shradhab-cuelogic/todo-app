import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingAuthComponent } from './components/testing-auth/testing-auth.component';
import { EditdialogComponent } from './components/editdialog/editdialog.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProfilepageComponent } from './components/profilepage/profilepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { AuthGuard } from './services/authGaurd';
import { AppTodoModule } from '../app/modules/feature-module/app-todo/app-todo.module'
const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'profilepage/:id', component: ProfilepageComponent, canActivate: [ AuthGuard ]  },
  { path: 'todo', component: TodoComponent  },
 // { path: 'todo/:id/edit', component: TododialogComponent},
  { path: 'tododashboard', component: TodolistComponent, canActivate: [ AuthGuard ]  },
  { path: 'testing', component: TestingAuthComponent, canActivate: [ AuthGuard ] },
  { path: 'todo', component: TodoComponent},
  { path: 'testlazy', loadChildren: '../app/modules/feature-module/app-todo/app-todo.module#AppTodoModule' },
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
