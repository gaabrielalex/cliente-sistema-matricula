import { Component, OnInit } from '@angular/core';
import { MatriculaAlunoService } from '../../services/matricula-aluno.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

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

  constructor(
    private matriculaAlunoService: MatriculaAlunoService,
    private FormBuilder: FormBuilder,
    private snackbarService: SnackbarService,
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
        // this.statusMatricula = 'C';

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

  handledSubmit() {

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

}
