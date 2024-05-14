import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormFieldComponent } from './components/text-form-field/text-form-field.component';
import { ElevatedButtonComponent } from './components/elevated-button/elevated-button.component';
import { LinkComponent } from './components/link/link.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TitleComponent } from './components/title/title.component';
import { DialogAddEditComponent } from '../user/components/dialog-add-edit/dialog-add-edit.component';
import { DialogConfirmartionComponent } from './components/dialog-confirmartion/dialog-confirmartion.component';
@NgModule({
  declarations: [
    TextFormFieldComponent,
    ElevatedButtonComponent,
    LinkComponent,
    TitleComponent,
    DialogConfirmartionComponent,
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    TextFormFieldComponent,
    ElevatedButtonComponent,
    LinkComponent,
    TitleComponent,
    DialogConfirmartionComponent,
  ],
  providers: [
  ]
})
export class SharedModule { }
