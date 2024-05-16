import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { AuthenticationService } from 'src/app/authentication';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: any = FormGroup;
  responseMessage: any;
  tipos: any = ['A', 'V'];

  constructor(
    private signUpService: SignUpService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxSerivce: NgxUiLoaderService,
    private snackBarService: SnackbarService
  ) { }

  //TESTAR TUDO
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRagex), Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.EmailRegex)]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      tipos: [null, [Validators.required]],
    });

  }

  //TESTAR TUDO
  handledSubmitSignUp(){
    var formData = this.signUpForm.value;
    if(formData.nome == null || formData.email == null || formData.senha == null ||  formData.tipos == null){
      this.snackBarService.openSnackBar("Nenhum dos campos podem estar vazios, por favor, os preencha para prosseguir com a Autenticação", GlobalConstants.error);
      return;
    }

    this.ngxSerivce.start();

    var formData = this.signUpForm.value;
    var data = {
      // id: this.dialogData.data.id ?? null, //Para add não precisa do id
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      tipo: formData.tipos
    }

    //Registra o usuário
    this.signUpService.signUp(data).subscribe((response: any) => {
      this.snackBarService.openSnackBar("Registro efetuado efetuado com sucesso, agora aguarde seu processo de autenticação...", GlobalConstants.success);

      //Fazendo o login do usuário
      this.authenticationService.login(formData.email, formData.senha).subscribe((response: any) => {
        this.ngxSerivce.stop();
        localStorage.setItem('Token', response.acessToken);
        localStorage.setItem('User', JSON.stringify(response.user));
        this.router.navigate(['/home']);
        this.snackBarService.openSnackBar("Registro e login efetuado com sucesso", GlobalConstants.success);
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
