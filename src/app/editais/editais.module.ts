import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditaisComponent } from './components/editais/editais.component';
import { EditaisService } from './services/editais.service';



@NgModule({
  declarations: [
    EditaisComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    EditaisComponent
  ],
  providers: [
    EditaisService
  ]
})
export class EditaisModule { }
