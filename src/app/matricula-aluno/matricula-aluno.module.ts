import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatriculaAlunoRoutingModule } from './matricula-aluno-routing.module';
import { MatriculaAlunoComponent } from './components/matricula-aluno/matricula-aluno.component';
import { MatriculaAlunoService } from './services/matricula-aluno.service';
import { SharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MatriculaAlunoComponent
  ],
  imports: [
    CommonModule,
    MatriculaAlunoRoutingModule,
    SharedModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatriculaAlunoComponent
  ],
  providers: [
    MatriculaAlunoService
  ]
})
export class MatriculaAlunoModule { }
