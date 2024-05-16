import { Component, OnInit } from '@angular/core';
import { EditaisService } from '../../services/editais.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/others/global-constants';

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
  }

  handleEditAction(values: any) {
  }

  handleDeleteAction(values: any) {
  }
}
