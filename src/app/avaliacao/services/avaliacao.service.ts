import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  apiUrl: string = environment.apiUrl;
  path_route: string = '/avaliacoes';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  addAvaliacao(data: any) {
    return this.httpClient.post(
      `${this.apiUrl}${this.path_route}`,
      data,
      GlobalConstants.default_headers_routes
    );
  }

  getAlunoByEmail(email: string) {
    return this.httpClient.get(
     `${this.apiUrl}/aluno/${email}`,
      GlobalConstants.default_headers_routes
    );
  }

  getAlunoMatriculaByEmail(email: string) {
    return this.httpClient.get(
      `${this.apiUrl}/aluno/${email}/matricula`,
      GlobalConstants.default_headers_routes
    );
  }

   obterDownloadUrlDasDocumentacoes(email: string) {
    return this.httpClient.get(
      `${this.apiUrl}/matricula/${email}/documentacoes`,
      GlobalConstants.default_headers_routes
    );
  }
}
