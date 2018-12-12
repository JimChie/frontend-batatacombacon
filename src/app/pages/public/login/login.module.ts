import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailMessageSuccessComponent } from './email-message-success/email-message-success.component';
import { EmailMessageErrorComponent } from './email-message-error/email-message-error.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    EsqueceuSenhaComponent,
    EmailMessageSuccessComponent,
    EmailMessageErrorComponent
  ],
  entryComponents: [
    EsqueceuSenhaComponent,
    EmailMessageErrorComponent,
    EmailMessageSuccessComponent
  ]
})
export class LoginModule { }
