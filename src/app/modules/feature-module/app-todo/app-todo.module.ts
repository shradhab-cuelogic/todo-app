import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingComponent } from './testing/testing.component';
import { AppTodoRoutingModule } from './app-todo-routing.module';

@NgModule({
  declarations: [TestingComponent],
  imports: [
    CommonModule,
    AppTodoRoutingModule
  ]
})
export class AppTodoModule { }
