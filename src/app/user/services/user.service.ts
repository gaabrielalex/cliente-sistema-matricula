import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl;
  acess_token: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  addUser(name: string, email: string, senha: string, tipo: 'A' | 'V'){
    //Apenas usuários do tipo adminstrador e avaliador podem ser cadastrados por meio desse função, o cadastro
    //de usários do tipo aluno é feito por outra parte do sistema
    return this.httpClient.post(
      this.apiUrl + '/user',
      {name: name, email: email, senha: senha, tipo: tipo},
      {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-access-token', localStorage.getItem('Token') ?? '')}
    );
  }

  // getUsers(){
  //   return this.httpClient.get(
  //     this.apiUrl + '/user',
  //     {headers: new HttpHeaders()
  //       .set('Content-Type', 'application/json')
  //       .set('x-access-token', localStorage.getItem('Token') ?? '')}
  //   );
  // }
}
