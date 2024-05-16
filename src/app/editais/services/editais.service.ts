import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditaisService {
  apiUrl: string = environment.apiUrl;
  path_route: string = '/editais';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  get(){
    return this.httpClient.get(
      this.apiUrl + this.path_route,
      GlobalConstants.default_headers_routes
    );
  }

  add(data: any){
    return this.httpClient.post(
      this.apiUrl + this.path_route,
      data,
      GlobalConstants.default_headers_routes
    );
  }

  update(data: any){
    return this.httpClient.patch(
      this.apiUrl + this.path_route + '/' + data.id,
      data,
      GlobalConstants.default_headers_routes
    );
  }

  delete(id: any){
    return this.httpClient.delete(
      this.apiUrl + this.path_route + '/' + id,
      GlobalConstants.default_headers_routes
    );
  }
}
