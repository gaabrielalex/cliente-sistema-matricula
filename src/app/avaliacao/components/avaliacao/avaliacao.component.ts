import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  status: any = ['A', 'R'];
  avalicaoForm: any = FormGroup;
  responseMessage: any;
  dadosAluno: any;
  dadosMatricula: any;
  emailAluno: any;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private FormBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private ngxSerivce: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const emailAluno = params.get('email_aluno');
      this.emailAluno = emailAluno !== null ? emailAluno : null;

      if (this.emailAluno !== null) {
        this.carregarDados(this.emailAluno);
      } else {
        this.tratarErroCarregamentoDados();
      }
    });

    this.avalicaoForm = this.FormBuilder.group({
      comentarios: [null, [Validators.maxLength(400)]],
      status: [null, [Validators.required]],
    })

    this.onStatusChange();
  }

  onStatusChange(): void {
    this.avalicaoForm.get('status').valueChanges.subscribe((status: any)=> {
      const comentariosControl = this.avalicaoForm.get('comentarios');

      if (status === 'A') {
        comentariosControl.clearValidators();
        comentariosControl.setValidators([Validators.maxLength(400)]);
      } else {
        comentariosControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(400)]);
      }

      comentariosControl.updateValueAndValidity();
    });
  }

  carregarDados(emailAluno: string): void {
    this.obterDadosAluno(emailAluno).then((response: any) => {
      this.dadosAluno = response;
      this.obterDadosMatricula(emailAluno).then((response: any) => {
        this.dadosMatricula = response;
      }).catch((error) => {
        console.log(error);
        this.tratarErroCarregamentoDados();
      });
    }).catch((error) => {
      console.log(error);
      this.tratarErroCarregamentoDados();
    });
  }

  obterDadosAluno(emailAluno: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.avaliacaoService.getAlunoByEmail(emailAluno).subscribe((response: any) => {
        var dadosAluno = response.aluno;
        resolve(dadosAluno)
      },(error) => {
        reject(error.error.error);
      });
    });
  }

  obterDadosMatricula(emailAluno: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.avaliacaoService.getAlunoMatriculaByEmail(emailAluno).subscribe((response: any) => {
        var dadosMatricula = response.matricula;
        resolve(dadosMatricula)
      },(error) => {
        reject(error.error.error);
      });
    });
  }

  tratarErroCarregamentoDados(): void {
    this.snackbarService.openSnackBar("Erro ao obter os dados do aluno, por favor, tente novamente mais tarde", GlobalConstants.error);
    this.router.navigate(['/matriculas-avaliacao']);
  }

  apresentarDocumentacoes(): void{
    if(this.dadosAluno == null){
      this.snackbarService.openSnackBar("Aguarde enquanto os dados do aluno são carregados...", GlobalConstants.error);
      return;
    }
    this.avaliacaoService.obterDownloadUrlDasDocumentacoes(this.dadosAluno.email).subscribe((response: any) => {
      window.open(response.downloadURL, '_blank');
    }, (error: any) => {
      this.snackbarService.openSnackBar("Houve um erro ao tentar abrir as documentações da matrícula, tente novamente mais tarde...", GlobalConstants.error, 4000);
    });
  }

  handledSubmit(): void {
    var formData = this.avalicaoForm.value;
    if(formData.status == null){
      this.snackbarService.openSnackBar("O campo de status não pode estar vazio, por favor, o preencha para prosseguir com a avaliação", GlobalConstants.error);
      return;
    }
    else if(formData.comentarios == null  && formData.status === 'R'){
      this.snackbarService.openSnackBar("O campo de comentários não pode estar vazio caso a status definido para a avaliação seja de reprovado, por favor, o preencha para prosseguir com a avaliação", GlobalConstants.error);
      return;
    }

    this.ngxSerivce.start();

    var formData = this.avalicaoForm.value;
    let dtAvaliacao = new Date().toISOString().split('T')[0];
    var data = {
      id_matricula: this.dadosMatricula.id_matricula,
      dt_avaliacao: dtAvaliacao,
      status: formData.status,
      comentarios: formData.comentarios
    }

    this.avaliacaoService.addAvaliacao(data).subscribe((response: any) => {
      this.ngxSerivce.stop();
      this.responseMessage = response.success;
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.success);
    }, (error: any) => {
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = GlobalConstants.GenereicErrorMessage;
      }
      this.ngxSerivce.stop();
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}
