import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditaisService } from '../../services/editais.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { dateValidator } from 'src/app/shared/others/validators';
import { convertDate } from 'src/app/shared/others/converts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-editais-dialog-add-edit',
  templateUrl: './editais-dialog-add-edit.component.html',
  styleUrls: ['./editais-dialog-add-edit.component.css']
})
export class EditaisDialogAddEditComponent implements OnInit {
  onAddEdital = new EventEmitter();
  onEditEdital = new EventEmitter();
  editalForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  fileToUpload: File | null = null;
  fileError: string | null = null;
  allowedExtensionsForFile = ['xlsx'];
  dataFromExcel: any[] = [];
  enviarPlanilhaAlunosInscritosEmJson = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private FormBuilder: FormBuilder,
    private editaisService: EditaisService,
    public dialogRef: MatDialogRef<EditaisDialogAddEditComponent>,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.editalForm = this.FormBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(8)]],
      dt_abertura: [null, [Validators.required]],
      planilha_alunos_inscritos: [null, [Validators.required]],
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit';
      this.action = 'Edit';

      this.editalForm.patchValue(this.dialogData.data);
    }

    //Caso exclusivo da parte de valiação do campo planilha_alunos_inscritos
    //Caso a opção seja de editar esse campo não deve ser obrigatório
    if(this.dialogData.action === 'Edit'){
      this.editalForm.get('planilha_alunos_inscritos').clearValidators();
      this.editalForm.get('planilha_alunos_inscritos').updateValueAndValidity();
    } else {
      this.editalForm.get('planilha_alunos_inscritos').setValidators([Validators.required]);
      this.editalForm.get('planilha_alunos_inscritos').updateValueAndValidity();
    }
  }

  handleSubmmit(){
    if(this.dialogAction === 'Edit'){
      this.edit();
    } else {
      this.add();
    }
  }

  add(){
    var formData = this.editalForm.value;
    //Maneira antes de ter arquivo no meio para enviar
    // var data = {
    //   // id: this.dialogData.data.id ?? null, //Para add não precisa do id
    //   nome: formData.nome,
    //   dt_abertura: convertDate(formData.dt_abertura),
    // }

    //Maneira para enviar arquivo
    var data: FormData = new FormData();
    data.append('nome', formData.nome);
    data.append('dt_abertura', convertDate(formData.dt_abertura));
    if(!this.enviarPlanilhaAlunosInscritosEmJson){
      data.append('planilha_alunos_inscritos', this.fileToUpload ?? new Blob(), this.fileToUpload == null ? "" : this.fileToUpload.name);
    } else{
      //Caso queira enviar os dados da planilha em json
      data.append('planilha_alunos_inscritos_json', JSON.stringify(this.dataFromExcel));
    }
    this.editaisService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddEdital.emit(response);
      this.responseMessage = response.success;
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.success);
    }, (error: any) => {
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = GlobalConstants.GenereicErrorMessage;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  edit(){
    var formData = this.editalForm.value;
    var data = {
      id: this.dialogData.data.id_edital,
      nome: formData.nome,
      dt_abertura: convertDate(formData.dt_abertura),
    }
    this.editaisService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditEdital.emit(response);
      this.responseMessage = response.success;
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.success);
    }, (error: any) => {
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = GlobalConstants.GenereicErrorMessage;
      }
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
        this.transformarArquivoExcelEmJson(file);
      } else {
        this.fileError = `Extensão de arquivo não permitida. Permitido: .${this.allowedExtensionsForFile.join(', ')}`;
        this.editalForm.get('planilha_alunos_inscritos').setErrors({ 'invalidExtension': true });
        this.fileToUpload = null;
      }
    }

  }

  //Função para caso vc queria enviar os dados da planilha para o
  //backend em json ao invés de enviar o arquivo diretamente
  transformarArquivoExcelEmJson(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.dataFromExcel = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.dataFromExcel); // Aqui você pode ver os dados da planilha
      // Faça o tratamento necessário com os dados da planilha
    };
    reader.readAsBinaryString(file);
  }

}
