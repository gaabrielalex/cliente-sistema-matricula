import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { TitleComponent } from '../shared/components/title/title.component';
import { SharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports:[
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
