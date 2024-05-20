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
    private userService: UserService,
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
  }
}
