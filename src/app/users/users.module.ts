import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { UsersService } from './services/users.service';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
