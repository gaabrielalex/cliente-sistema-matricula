import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditaisComponent } from './components/editais/editais.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EditaisComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditaisRoutingModule { }
