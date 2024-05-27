import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculasAvaliacaoRoutingModule } from './matriculas-avaliacao-routing.module';
import { MatriculasAvaliacaoComponent } from './components/matriculas-avaliacao/matriculas-avaliacao.component';
import { MatriculaAlunoService } from '../matricula-aluno/services/matricula-aluno.service';
import { SharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MatriculasAvaliacaoComponent
  ],
  imports: [
    CommonModule,
    MatriculasAvaliacaoRoutingModule,
    SharedModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatriculasAvaliacaoComponent
  ],
  providers: [
    MatriculaAlunoService
  ]
})
export class MatriculasAvaliacaoModule { }
