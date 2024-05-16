import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';
import { DialogAddEditComponent } from '../dialog-add-edit/dialog-add-edit.component';
import { DialogConfirmartionComponent } from 'src/app/shared/components/dialog-confirmartion/dialog-confirmartion.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userTitle = 'Usuários';
  displayedColumns: string[] = ['nome', 'email', 'tipo', 'acoes'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialogRef: MatDialog,
    private ngxSerivce: NgxUiLoaderService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.ngxSerivce.start();
    this.tableData();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.email == filter;
     };
  }

  tableData(){
    this.userService.get().subscribe((response: any) => {
      this.ngxSerivce.stop();
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
    },(error) => {
      this.ngxSerivce.stop();
      console.log(error);
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = 'Erro ao buscar os usuários';
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    if(true) {
      this.snackBarService.openSnackBar("Funcionalidade inativa no momento", GlobalConstants.error);
      return;
    }
    const dialogConifg = new MatDialogConfig();
    dialogConifg.data = {
      action: 'Add'
    }
    dialogConifg.width = '850px';
    const dialogRef = this.dialogRef.open(DialogAddEditComponent, dialogConifg);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddUser.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleEditAction(values: any) {
    if(true) {
      this.snackBarService.openSnackBar("Funcionalidade inativa no momento", GlobalConstants.error);
      return;
    }
    const dialogConifg = new MatDialogConfig();
    dialogConifg.data = {
      action: 'Edit',
      data: values
    }
    dialogConifg.width = '850px';
    const dialogRef = this.dialogRef.open(DialogAddEditComponent, dialogConifg);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditUser.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleDeleteAction(values: any) {
    const dialogConifg = new MatDialogConfig();
    dialogConifg.data = {
      message: 'Deseja realmente excluir o usuário ' + values.nome + '?',
    }
    dialogConifg.width = '850px';
    const dialogRef = this.dialogRef.open(DialogConfirmartionComponent, dialogConifg);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) =>{
      this.ngxSerivce.start();
      this.deleteUser(values.id_usuario);
      dialogRef.close();
    });
  }

  deleteUser(id_usuario: any){
    this.userService.delete(id_usuario).subscribe((response: any) => {
      this.ngxSerivce.stop();
      this.tableData();
      this.responseMessage = response?.sucess;
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.success);
    }, (error: any) => {
      this.ngxSerivce.stop();
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = GlobalConstants.GenereicErrorMessage;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}
