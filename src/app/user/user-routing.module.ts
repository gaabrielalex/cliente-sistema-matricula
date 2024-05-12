import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from '../home/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
