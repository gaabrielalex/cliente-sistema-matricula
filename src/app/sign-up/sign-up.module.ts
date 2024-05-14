import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpService } from './services/sign-up.service';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SignUpComponent
  ],
  providers: [
    SignUpService
  ]
})
export class SignUpModule { }
