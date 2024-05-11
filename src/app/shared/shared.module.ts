import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormFieldComponent } from './components/text-form-field/text-form-field.component';
import { ElevatedButtonComponent } from './components/elevated-button/elevated-button.component';
import { LinkComponent } from './components/link/link.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    TextFormFieldComponent,
    ElevatedButtonComponent,
    LinkComponent,
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    TextFormFieldComponent,
    ElevatedButtonComponent,
    LinkComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
