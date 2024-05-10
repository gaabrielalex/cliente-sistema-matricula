import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Console } from 'console';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;
  @Input() email: any;
  @Input() password: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AuthenticationComponent>,
    // private ngxSerivce: NgxUiLoaderService,
    // private snackBarService: SnackBarService
  ) {

  }

  ngOnInit(): void {
  }

  onLogin(){
    this.authenticationService.login(this.email, this.password);
  }
}
