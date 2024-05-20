import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordService } from './services/reset-password.service';
import { SharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    SharedModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    ResetPasswordComponent
  ],
  providers: [
    ResetPasswordService,
  ]
})
export class ResetPasswordModule { }
