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

  add(data: any){
    //Apenas usuários do tipo adminstrador e avaliador podem ser cadastrados por meio desse função, o cadastro
    //de usários do tipo aluno é feito por outra parte do sistema
    return this.httpClient.post(
      this.apiUrl + '/users',
      data,
      {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-access-token', localStorage.getItem('Token') ?? '')}
    );
  }

  get(){
    return this.httpClient.get(
      this.apiUrl + '/users',
      {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-access-token', localStorage.getItem('Token') ?? '')}
    );
  }

  update(data: any){
    return this.httpClient.patch(
      this.apiUrl + '/users/' + data.id,
      data,
      {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-access-token', localStorage.getItem('Token') ?? '')}
    );
  }

  delete(id_usuario: any){
    return this.httpClient.delete(
      this.apiUrl + '/users/' + id_usuario,
      {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-access-token', localStorage.getItem('Token') ?? '')}
    );
  }

  getTipos(){
    return this.httpClient.get(
      this.apiUrl + '/users/types',
      {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-access-token', localStorage.getItem('Token') ?? '')}
    );
  }

}
