import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormFieldComponent } from './components/text-form-field/text-form-field.component';
import { ElevatedButtonComponent } from './components/elevated-button/elevated-button.component';
import { LinkComponent } from './components/link/link.component';
import { FormsModule } from '@angular/forms';
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
    LinkComponent
  ]
})
export class SharedModule { }