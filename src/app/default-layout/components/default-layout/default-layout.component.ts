import { AuthenticationService } from './../../../authentication/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { DefaultLayoutService } from '../../services/default-layout.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/others/global-constants';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  tipoUsuario: string = '';
  responseMessage: any;

  constructor(
    private defaultLayoutService: DefaultLayoutService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxSerivce: NgxUiLoaderService,
    private snackBarService: SnackbarService
  ) {
    const usuarioString = localStorage.getItem('User');

    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.tipoUsuario = usuario.tipo;
    } else {
      // Define um valor padrão caso o tipo do usuário não seja encontrado
      this.tipoUsuario = 'G'; // Ou qualquer outro valor padrão adequado
    }
  }

  ngOnInit(): void {
  }

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  logout() {
    this.ngxSerivce.start();

    this.authenticationService.logout().subscribe((response: any) => {
      this.ngxSerivce.stop();
      this.snackBarService.openSnackBar("Logout efetuado com sucesso", GlobalConstants.success);
    },(error) => {
      this.ngxSerivce.stop();
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = GlobalConstants.GenereicErrorMessage;
      }
      if(error.status === 500){
        this.snackBarService.openSnackBar("Logout efetuado com sucesso", GlobalConstants.success);
        this.router.navigate(['/login']);
        return;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
}
