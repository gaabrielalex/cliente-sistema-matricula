import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }
    this.snackBarService.openSnackBar('Você precisa estar autenticado para acessar essa página', GlobalConstants.error);
    return this.router.createUrlTree(['/login']); // Redirecionar para /login se não estiver autenticado
  }
}
