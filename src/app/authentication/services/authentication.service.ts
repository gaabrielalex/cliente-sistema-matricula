import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl: string = environment.apiUrl;
  acess_token: string = '';

  //Já sabe que o erro é aqui nesse HttpClient, na hora que faço o uso dele da erro
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post(
      this.apiUrl + '/login',
      {email: email, password: password},
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    );
  }
}
