import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AvaliacaoComponent
  },
  {
    path: 'avaliacao',
    loadChildren: () => import('./avaliacao.module').then(m => m.AvaliacaoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoRoutingModule { }
