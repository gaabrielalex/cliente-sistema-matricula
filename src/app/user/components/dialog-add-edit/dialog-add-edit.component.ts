import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditComponent implements OnInit {
  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();
  userForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  tipos: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private FormBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogAddEditComponent>,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.FormBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRagex), Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.EmailRegex)]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      tipos: [null, [Validators.required]],
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit';
      this.action = 'Edit';

      //Antes de carregar os dados do usuário, é necessário converter o tipo para tipos
      //pois é o control name do campo no formulário, só depois disso é possível carregar os dados
      this.dialogData.data.tipos = this.dialogData.data.tipo;
      this.userForm.patchValue(this.dialogData.data);
    }

    //Carregas os tipos de usuários
    this.getTipos();
  }

  getTipos(){
    this.userService.getTipos().subscribe((response: any) => {
      this.tipos = response.types;
    }, (error: any) => {
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = 'Erro ao buscar os tipos de usuários'
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  handleSubmmit(){
    if(this.dialogAction === 'Edit'){
      this.edit();
    } else {
      this.add();
    }
  }

  add(){
    var formData = this.userForm.value;
    var data = {
      // id: this.dialogData.data.id ?? null, //Para add não precisa do id
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      tipo: formData.tipos
    }
    this.userService.addUser(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddUser.emit(response);
      this.responseMessage = response.sucess;
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
    var formData = this.userForm.value;
    var data = {
      id: this.dialogData.data.id_usuario,
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      tipo: formData.tipos
    }
    this.userService.updateUser(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditUser.emit(response);
      this.responseMessage = response.sucess;
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

}
