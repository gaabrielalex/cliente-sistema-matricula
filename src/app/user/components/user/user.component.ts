import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';

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
    this.userService.getUsers().subscribe((response: any) => {
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

  ////TESTAR TUDO
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
