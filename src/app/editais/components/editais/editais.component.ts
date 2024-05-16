import { Component, OnInit } from '@angular/core';
import { EditaisService } from '../../services/editais.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { EditaisDialogAddEditComponent } from '../editais-dialog-add-edit/editais-dialog-add-edit.component';
import { DialogConfirmartionComponent } from 'src/app/shared/components/dialog-confirmartion/dialog-confirmartion.component';

@Component({
  selector: 'app-editais',
  templateUrl: './editais.component.html',
  styleUrls: ['./editais.component.css']
})
export class EditaisComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'dt_abertura', 'acoes'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private editaisService: EditaisService,
    private router: Router,
    public dialogRef: MatDialog,
    private ngxSerivce: NgxUiLoaderService,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.ngxSerivce.start();
    this.tableData();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.nome == filter;
     };
  }

  tableData(){
    this.editaisService.get().subscribe((response: any) => {
      this.ngxSerivce.stop();
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
    },(error) => {
      this.ngxSerivce.stop();
      console.log(error);
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = 'Erro ao buscar os editais';
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConifg = new MatDialogConfig();
    dialogConifg.data = {
      action: 'Add'
    }
    dialogConifg.width = '850px';
    const dialogRef = this.dialogRef.open(EditaisDialogAddEditComponent, dialogConifg);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddEdital.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleEditAction(values: any) {
    const dialogConifg = new MatDialogConfig();
    dialogConifg.data = {
      action: 'Edit',
      data: values
    }
    dialogConifg.width = '850px';
    const dialogRef = this.dialogRef.open(EditaisDialogAddEditComponent, dialogConifg);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditEdital.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleDeleteAction(values: any) {
    const dialogConifg = new MatDialogConfig();
    dialogConifg.data = {
      message: 'Deseja realmente excluir o edital ' + values.nome + '?',
    }
    dialogConifg.width = '850px';
    const dialogRef = this.dialogRef.open(DialogConfirmartionComponent, dialogConifg);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) =>{
      this.ngxSerivce.start();
      this.deleteEdital(values.id_edital);
      dialogRef.close();
    });
  }

  deleteEdital(id: any){
    this.editaisService.delete(id).subscribe((response: any) => {
      this.ngxSerivce.stop();
      this.tableData();
      this.responseMessage = response?.success;
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
