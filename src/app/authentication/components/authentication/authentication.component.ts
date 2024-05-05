import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Console } from 'console';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  @Input() email: any;
  @Input() password: any;

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  onLogin(){
    this.authenticationService.login(this.email);
  }
}
