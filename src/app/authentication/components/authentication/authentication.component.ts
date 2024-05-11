import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Console, error } from 'console';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AuthenticationComponent>,
    private ngxSerivce: NgxUiLoaderService,
    private snackBarService: SnackbarService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.EmailRegex)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  handledSubmitLogin(){
    var formData = this.loginForm.value;
    if(formData.email == null || formData.password == null){
      this.snackBarService.openSnackBar("Nenhum dos campos podem estar vazios, por favor, os preencha para prosseguir com a Autenticação", GlobalConstants.error);
      return;
    }

    this.ngxSerivce.start();

    this.authenticationService.login(formData.email, formData.password).subscribe((response: any) => {
      this.ngxSerivce.stop();
      localStorage.setItem('Token', response.acessToken);
      localStorage.setItem('User', JSON.stringify(response.user));
      this.router.navigate(['/home']);
      this.snackBarService.openSnackBar("Login efetuado com sucesso", GlobalConstants.success);
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
