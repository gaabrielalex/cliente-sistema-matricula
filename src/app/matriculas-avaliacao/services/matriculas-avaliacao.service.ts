import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculasAvaliacaoService {
  apiUrl: string = environment.apiUrl;
  path_route: string = '/matriculas-avaliacao';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  get(idAvaliador: number){
    return this.httpClient.get(
      this.apiUrl + this.path_route + `/${idAvaliador}`,
      GlobalConstants.default_headers_routes
    );
  }
}
