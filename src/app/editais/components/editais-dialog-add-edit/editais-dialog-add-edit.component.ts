import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditaisService } from '../../services/editais.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { dateValidator } from 'src/app/shared/others/validators';
import { convertDate } from 'src/app/shared/others/converts';

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
    var data = {
      // id: this.dialogData.data.id ?? null, //Para add não precisa do id
      nome: formData.nome,
      dt_abertura: convertDate(formData.dt_abertura),
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
      } else {
        this.fileError = `Extensão de arquivo não permitida. Permitido: .${this.allowedExtensionsForFile.join(', ')}`;
        this.editalForm.get('planilha_alunos_inscritos').setErrors({ 'invalidExtension': true });
        this.fileToUpload = null;
      }
    }
  }

}
