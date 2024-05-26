import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaAlunoService {
  apiUrl: string = environment.apiUrl;
  path_route: string = '/matricula';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  getByEmail(email: string){
    return this.httpClient.get(
      this.apiUrl + this.path_route + `/${email}`,
      GlobalConstants.default_headers_routes
    );
  }

  efetivarMatricula(data:any, email: string) {
    return this.httpClient.patch(
      this.apiUrl + "/efetivar-matricula" + `/${email}`,
      data,
      GlobalConstants.default_headers_routes_form_data
    );
  }

  editarMatricula(data:any, email: string) {
    return this.httpClient.patch(
      this.apiUrl + "/editar-matricula" + `/${email}`,
      data,
      GlobalConstants.default_headers_routes_form_data
    );
  }

  reenviarMatricula(data:any, email: string) {
    return this.httpClient.patch(
      this.apiUrl + "/reenviar-matricula" + `/${email}`,
      data,
      GlobalConstants.default_headers_routes_form_data
    );
  }

  obterDownloadUrlDasDocumentacoes(email: string) {
    return this.httpClient.get(
      this.apiUrl + this.path_route + `/${email}` + '/documentacoes',
      GlobalConstants.default_headers_routes
    );
  }

}
