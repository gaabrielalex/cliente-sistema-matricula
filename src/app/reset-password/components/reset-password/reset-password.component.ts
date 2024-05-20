import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../../services/reset-password.service';
import { UserService } from 'src/app/user/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

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

  }
}
