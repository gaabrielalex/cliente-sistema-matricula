import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private signUpService: SignUpService) { }

  ngOnInit(): void {
  }

}
