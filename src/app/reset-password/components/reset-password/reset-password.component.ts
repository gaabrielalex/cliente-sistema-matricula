import { AuthenticationService } from 'src/app/authentication';
import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../../services/reset-password.service';
import { UserService } from 'src/app/user/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/others/global-constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private resetPasswordService: ResetPasswordService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxSerivce: NgxUiLoaderService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      senhaAtual: [null, [Validators.required]],
      novaSenha: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  handledSubmitResetPassword(){
    var formData = this.resetPasswordForm.value;
    if(formData.senhaAtual == null || formData.novaSenha == null){
      this.snackBarService.openSnackBar("Nenhum dos campos podem estar vazios, por favor, os preencha para prosseguir a redefinição de senha", GlobalConstants.error);
      return;
    } else if (formData.senhaAtual == formData.novaSenha){
      this.snackBarService.openSnackBar("A nova senha não pode ser igual a senha atual!", GlobalConstants.error);
      return;
    }

    this.ngxSerivce.start();

    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');
    console.log(usuario);
    console.log(usuario.email);
    var data = {
      email: usuario.email,
      senha_atual: formData.senhaAtual,
      nova_senha:  formData.novaSenha,
    }

    this.resetPasswordService.resetPassword(data).subscribe((response: any) => {
      this.snackBarService.openSnackBar("Senha redefinida com sucesso. Sua autenticação será reiniciada com as novas credenciais", GlobalConstants.success);

      //Fazendo o login do usuário
      this.authenticationService.login(data.email, data.nova_senha).subscribe((response: any) => {
        this.ngxSerivce.stop();
        localStorage.setItem('Token', response.acessToken);
        localStorage.setItem('User', JSON.stringify(response.user));
        this.router.navigate(['/home']);
        this.snackBarService.openSnackBar("Sua senha foi redefinida com sucesso, bem como sua autenticação foi reiniciada", GlobalConstants.success);
      },(error) => {
        this.ngxSerivce.stop();
        if(error.error?.error != null){
          this.responseMessage = error.error.error;
        } else {
          this.responseMessage = GlobalConstants.GenereicErrorMessage;
        }
        this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      })
    },(error) => {
      this.ngxSerivce.stop();
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = GlobalConstants.GenereicErrorMessage;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
}
