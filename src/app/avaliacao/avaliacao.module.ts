import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacaoRoutingModule } from './avaliacao-routing.module';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { AvaliacaoService } from './services/avaliacao.service';
import { SharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AvaliacaoComponent
  ],
  imports: [
    CommonModule,
    AvaliacaoRoutingModule,
    SharedModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    AvaliacaoComponent
  ],
  providers: [
    AvaliacaoService
  ]
})
export class AvaliacaoModule { }
