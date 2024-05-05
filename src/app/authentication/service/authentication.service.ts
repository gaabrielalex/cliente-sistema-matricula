import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {

  }

  login(email: string){
    alert('You are logged in as ' + email);
  }
}
