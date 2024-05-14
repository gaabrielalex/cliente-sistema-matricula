import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/components/home/home.component';
import { AuthenticationComponent } from './authentication/components/authentication/authentication.component';
import { AuthGuard } from './shared/services/auth-guard/auth-guard.service';
import { DefaultLayoutComponent } from './default-layout/components/default-layout/default-layout.component';
import { AdminGuardService } from './shared/services/admin-guard/admin-guard.service';
import { SignUpComponent } from './sign-up/components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'user',
        canActivate: [AdminGuardService],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: '**',
        redirectTo: '/home'
      }
    ]
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
