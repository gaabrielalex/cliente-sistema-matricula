import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { DefaultLayoutModule } from './default-layout/default-layout.module';
import { UserModule } from './user/user.module';

const NgxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: "#FFFFFF",
  textPosition: "center-center",
  pbColor: "red",
  bgsColor: "red",
  fgsColor: "red",
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthenticationModule,
    DefaultLayoutModule,
    UserModule,
    FormsModule,
    HomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig),
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
