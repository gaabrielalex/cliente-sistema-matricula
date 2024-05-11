import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Console } from 'console';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl: string = environment.apiUrl;
  acess_token: string = '';

  //Já sabe que o erro é aqui nesse HttpClient, na hora que faço o uso dele da erro
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  login(email: string, senha: string){
    return this.httpClient.post(
      this.apiUrl + '/login',
      {email: email, senha: senha},
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    );
  }

  isLoggedIn(){
    if(localStorage.getItem('Token') != null){
      return true;
    }
    return false;
  }

  logout(){

    return this.httpClient.post(
      this.apiUrl + '/logout',
      {},
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('x-access-token', localStorage.getItem('Token') ?? ''),
        observe: 'response',
      }
    ).pipe(
      tap((response: any) => {
        // Verifique se o status da resposta é 200
        console.log(response);
        if (response.status === 200) {
          // Executar ações desejadas aqui, como redirecionar o usuário ou exibir uma mensagem de sucesso
          console.log('Logout bem-sucedido');

          localStorage.removeItem('Token');
          localStorage.removeItem('User');
          this.router.navigate(['/login']);
        }
      }));
  }
}
