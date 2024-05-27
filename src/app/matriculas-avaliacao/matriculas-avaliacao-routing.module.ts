import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatriculasAvaliacaoComponent } from './components/matriculas-avaliacao/matriculas-avaliacao.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MatriculasAvaliacaoComponent
  },
  {
    path: 'avaliacao/:id_matricula',
    loadChildren: () => import('../avaliacao/avaliacao.module').then(m => m.AvaliacaoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculasAvaliacaoRoutingModule { }
