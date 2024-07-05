import { AlunoGuardService } from './shared/services/aluno-guard/aluno-guard.service';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/components/home/home.component';
import { AuthenticationComponent } from './authentication/components/authentication/authentication.component';
import { AuthGuard } from './shared/services/auth-guard/auth-guard.service';
import { DefaultLayoutComponent } from './default-layout/components/default-layout/default-layout.component';
import { AdminGuardService } from './shared/services/admin-guard/admin-guard.service';
import { SignUpComponent } from './sign-up/components/sign-up/sign-up.component';
import { AvaliadorGuardService } from './shared/services/avaliador-guard.service';

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
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        canActivate: [AdminGuardService, AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'editais',
        canActivate: [AdminGuardService, AuthGuard],
        loadChildren: () => import('./editais/editais.module').then(m => m.EditaisModule)
      },
      {
        path: 'reset-password',
        canActivate: [AuthGuard],
        loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'matricula-aluno',
        canActivate: [AlunoGuardService, AuthGuard],
        loadChildren: () => import('./matricula-aluno/matricula-aluno.module').then(m => m.MatriculaAlunoModule)
      },
      {
        path: 'matriculas-avaliacao',
        canActivate: [AvaliadorGuardService, AuthGuard],
        loadChildren: () => import('./matriculas-avaliacao/matriculas-avaliacao.module').then(m => m.MatriculasAvaliacaoModule)
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
