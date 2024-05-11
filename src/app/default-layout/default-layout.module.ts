import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { DefaultLayoutService } from './services/default-layout.service';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication';



@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    DefaultLayoutComponent
  ],
  providers: [
    DefaultLayoutService,
    AuthenticationService,
  ]
})
export class DefaultLayoutModule { }
