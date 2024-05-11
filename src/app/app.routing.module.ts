import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/components/home/home.component';
import { AuthenticationComponent } from './authentication/components/authentication/authentication.component';
import { AuthGuard } from './shared/services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent
  },
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
