import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { DefaultLayoutService } from './services/default-layout.service';


@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultLayoutComponent
  ],
  providers: [
    DefaultLayoutService,
  ]
})
export class DefaultLayoutModule { }
