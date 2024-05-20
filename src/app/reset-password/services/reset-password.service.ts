import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/others/global-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  apiUrl: string = environment.apiUrl;
  path_route: string = '/reset-password';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  resetPassword(data: any){
    return this.httpClient.post(
      this.apiUrl + this.path_route,
      data,
      GlobalConstants.default_headers_routes
    );
  }
}
