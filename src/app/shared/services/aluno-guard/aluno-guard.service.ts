import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../others/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AlunoGuardService {

  constructor(
    private router: Router,
    private snackBarService: SnackbarService
  ) { }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');

    //L = aluno
    if (usuario.tipo === 'L') {
      return true;
    }
    this.snackBarService.openSnackBar('Você precisa ser usuário do tipo aluno para acessar esta página', GlobalConstants.error);
    return this.router.createUrlTree(['/home']); // Redirecionar para /home se não for admin
  }
}
