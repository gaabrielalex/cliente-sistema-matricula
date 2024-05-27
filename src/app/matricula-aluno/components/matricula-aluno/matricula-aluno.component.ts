import { Component, OnInit } from '@angular/core';
import { MatriculaAlunoService } from '../../services/matricula-aluno.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-matricula-aluno',
  templateUrl: './matricula-aluno.component.html',
  styleUrls: ['./matricula-aluno.component.css']
})
export class MatriculaAlunoComponent implements OnInit {
  // Status posssíveis
  // X - Matricula inexistente
  // I - Matricula Incompleta(documentações ainda não enviadas)
  // C - Matricula Completa(documentações enviadas)
  // A - Matricula Aprovada pelo avaliador responsável(documentações aprovadas)
  // R - Matricula Reprovada pelo avaliador responsável(documentações reprovadas)
  //Por padrão a matricula é inexistente
  statusMatricula: String = 'X'
  matriculaAlunosForm: any = FormGroup;
  allowedExtensionsForFile = ['pdf'];
  fileToUpload: File | null = null;
  fileError: string | null = null;
  comentariosAvalicao: string = 'PorEnquantoTeste';
  responseMessage: any;

  constructor(
    private matriculaAlunoService: MatriculaAlunoService,
    private FormBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private ngxSerivce: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.matriculaAlunosForm = this.FormBuilder.group({
      pdf_docs_matricula: [null, [Validators.required]],
    })

    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');

    this.matriculaAlunoService.getByEmail(usuario.email).subscribe((response: any) => {
      if(response.length > 0){
        //Se existir matricula então o status é o status da matricula
        this.statusMatricula = response[0].status;

        //Linha para forçar o status da matricula para testes
        // this.statusMatricula = 'I';

      } else {
        //Se não existir matricula então o status é X
        this.statusMatricula = 'X';
      }
      console.log("O status da matricula foi definido como: " + this.statusMatricula)
    },(error) => {
      console.log("O status da matricula foi definido como: " + this.statusMatricula)
      console.log(error);
    })
  }

  //TESTAR
  handledSubmit() {
    var formData = this.matriculaAlunosForm.value;
    if (formData.pdf_docs_matricula == null) {
      this.snackbarService.openSnackBar("Arquivo das documentações não foi fornecido. Por favor, forneça o arquivo para prosseguir com a operação", GlobalConstants.error);
      return;
    }

    var data: FormData = new FormData();
    data.append('pdf_docs_matricula', this.fileToUpload ?? new Blob(), this.fileToUpload == null ? "" : this.fileToUpload.name);

    switch (this.statusMatricula) {
      case 'I':
        this.efetivarMatricula(data);
        break;
      case 'C':
        this.editarMatricula(data);
        break;
      case 'R':
        this.reenviarMatricula(data);
        break;
    }
  }

  efetivarMatricula(data: any) {
    this.ngxSerivce.start();

    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');

    this.matriculaAlunoService.efetivarMatricula(data, usuario.email).subscribe((response: any) => {
      this.matriculaAlunosForm.reset();
      this.ngxSerivce.stop();
      this.responseMessage = response.success;

      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.success, 8000);

      //Recarrega a página para atualizar o status da matricula
      setTimeout(() => {
        location.reload();

      }, 2500);

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

  editarMatricula(data: any) {
    this.ngxSerivce.start();

    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');

    this.matriculaAlunoService.editarMatricula(data, usuario.email).subscribe((response: any) => {
      this.matriculaAlunosForm.reset();
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

  reenviarMatricula(data: any) {
    this.ngxSerivce.start();

    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');

    this.matriculaAlunoService.reenviarMatricula(data, usuario.email).subscribe((response: any) => {
      this.matriculaAlunosForm.reset();
      this.ngxSerivce.stop();
      this.responseMessage = response.success;

      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.success, 8000);

       //Recarrega a página para atualizar o status da matricula
       setTimeout(() => {
        location.reload();

      }, 2500);
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

  onFileChange(event: any) {
    const file = event.target?.files[0];
    this.fileError = null; // Reseta a mensagem de erro

    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (this.allowedExtensionsForFile.includes(extension)) {
        this.fileToUpload = file;
      } else {
        this.fileError = `Extensão de arquivo não permitida. Permitido: .${this.allowedExtensionsForFile.join(', ')}`;
        this.matriculaAlunosForm.get('pdf_docs_matricula').setErrors({ 'invalidExtension': true });
        this.fileToUpload = null;
      }
    }
  }

  apresentarDocumentacoes() {
    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');

    this.matriculaAlunoService.obterDownloadUrlDasDocumentacoes(usuario.email).subscribe((response: any) => {
      window.open(response.downloadURL, '_blank');
    }, (error: any) => {
      this.snackbarService.openSnackBar("Houve um erro ao tentar abrir as documentações da matrícula, tente novamente mais tarde...", GlobalConstants.error, 4000);
    });
  }

}
