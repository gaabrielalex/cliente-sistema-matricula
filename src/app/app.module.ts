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
import { MatTableModule } from '@angular/material/table';
import { SignUpModule } from './sign-up/sign-up.module';
import { EditaisModule } from './editais/editais.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { MatriculasAvaliacaoModule } from './matriculas-avaliacao/matriculas-avaliacao.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';

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
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    AuthenticationModule,
    DefaultLayoutModule,
    UserModule,
    ResetPasswordModule,
    MatriculasAvaliacaoModule,
    AvaliacaoModule,
    MaterialModule,
    SignUpModule,
    FormsModule,
    HomeModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig),
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    EditaisModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
