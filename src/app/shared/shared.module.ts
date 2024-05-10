import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormFieldComponent } from './components/text-form-field/text-form-field.component';
import { ElevatedButtonComponent } from './components/elevated-button/elevated-button.component';
import { LinkComponent } from './components/link/link.component';
import { FormsModule } from '@angular/forms';
import { SnackBarService } from './services/snackbar-service/snack-bar.service';
@NgModule({
  declarations: [
    TextFormFieldComponent,
    ElevatedButtonComponent,
    LinkComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TextFormFieldComponent,
    ElevatedButtonComponent,
    LinkComponent,
  ], 
  providers: [
    SnackBarService
  ]
})
export class SharedModule { }
