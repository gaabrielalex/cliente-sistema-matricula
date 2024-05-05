import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl: string = environment.apiUrl;
  acess_token: string = '';

  //Já sabe que o erro é aqui nesse HttpClient, na hora que faço o uso dele da erro
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    this.httpClient.post(this.apiUrl + '/login', {email: email, password: password}).subscribe((response: any) => {
      this.acess_token = response.acess_token;
      console.log(this.acess_token);
    });
  }
}
