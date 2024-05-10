import { AuthenticationService } from './service/authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SharedModule } from '../shared';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    AuthenticationComponent,
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
