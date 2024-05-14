import { Injectable } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private userService: UserService) { }

  signUp(data: any){
    return this.userService.add(data);
  }
}
