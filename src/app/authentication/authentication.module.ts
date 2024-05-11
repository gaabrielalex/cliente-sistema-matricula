import { AuthenticationService } from './services/authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SharedModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarService } from '../shared/services/snackbar.service';

@NgModule({
  declarations: [
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  exports: [
    AuthenticationComponent,
  ],
  providers: [
    AuthenticationService,
    SnackbarService
  ]
})
export class AuthenticationModule { }
