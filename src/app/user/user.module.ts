import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { TitleComponent } from '../shared/components/title/title.component';
import { SharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { MatTableModule } from '@angular/material/table';
import { DialogAddEditComponent } from './components/dialog-add-edit/dialog-add-edit.component';

@NgModule({
  declarations: [
    UserComponent,
    DialogAddEditComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule,
    MatTableModule
  ],
  exports:[
    UserComponent,
    DialogAddEditComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
