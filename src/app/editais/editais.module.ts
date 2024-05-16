import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditaisRoutingModule } from './editais-routing.module';
import { EditaisComponent } from './components/editais/editais.component';
import { EditaisService } from './services/editais.service';
import { SharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogAddEditComponent } from './components/dialog-add-edit/dialog-add-edit.component';


@NgModule({
  declarations: [
    EditaisComponent,
    DialogAddEditComponent
  ],
  imports: [
    CommonModule,
    EditaisRoutingModule,
    SharedModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    EditaisComponent,
    DialogAddEditComponent
  ],
  providers: [
    EditaisService
  ]
})
export class EditaisModule { }
