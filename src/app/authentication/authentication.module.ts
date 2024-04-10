import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AuthenticationComponent
  ]
})
export class AuthenticationModule { }
