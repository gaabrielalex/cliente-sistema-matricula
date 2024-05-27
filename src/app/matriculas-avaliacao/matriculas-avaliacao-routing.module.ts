import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatriculasAvaliacaoComponent } from './components/matriculas-avaliacao/matriculas-avaliacao.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MatriculasAvaliacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculasAvaliacaoRoutingModule { }
