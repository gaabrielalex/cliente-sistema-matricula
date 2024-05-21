import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatriculaAlunoComponent } from './components/matricula-aluno/matricula-aluno.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MatriculaAlunoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculaAlunoRoutingModule { }
