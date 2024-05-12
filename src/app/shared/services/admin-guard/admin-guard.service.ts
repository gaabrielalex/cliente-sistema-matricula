import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private router: Router,
    private snackBarService: SnackbarService
  ) { }

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');

    if (usuario.tipo === 'A') {
      return true;
    }
    this.snackBarService.openSnackBar('Você precisa ser usuário do tipo adminstrador para acessar esta página', GlobalConstants.error);
    return this.router.createUrlTree(['/home']); // Redirecionar para /home se não for admin
  }
}
