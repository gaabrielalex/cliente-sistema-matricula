import { Router } from '@angular/router';
import { MatriculasAvaliacaoService } from './../../services/matriculas-avaliacao.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/others/global-constants';

@Component({
  selector: 'app-matriculas-avaliacao',
  templateUrl: './matriculas-avaliacao.component.html',
  styleUrls: ['./matriculas-avaliacao.component.css']
})
export class MatriculasAvaliacaoComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'cpf', 'acoes'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private matriculasAvaliacaoService: MatriculasAvaliacaoService,
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
    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');
    const idAvaliador : number = usuario.id_usuario;

    this.matriculasAvaliacaoService.get(idAvaliador).subscribe((response: any) => {
      this.ngxSerivce.stop();
      console.log(response);
      this.dataSource = new MatTableDataSource(response.matriculas);
    },(error) => {
      this.ngxSerivce.stop();
      console.log(error);
      if(error.error?.error != null){
        this.responseMessage = error.error.error;
      } else {
        this.responseMessage = 'Erro ao buscar as matrículas para avaliação';
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAvaliarAction(values: any) {
    // const dialogConifg = new MatDialogConfig();
    // dialogConifg.data = {
    //   action: 'Edit',
    //   data: values
    // }
    // dialogConifg.width = '850px';
    // const dialogRef = this.dialogRef.open(EditaisDialogAddEditComponent, dialogConifg);
    // this.router.events.subscribe(() => {
    //   dialogRef.close();
    // });
    // const sub = dialogRef.componentInstance.onEditEdital.subscribe(
    //   (response) => {
    //     this.tableData();
    //   }
    // );
  }
}
