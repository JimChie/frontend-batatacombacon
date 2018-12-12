import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroComponent } from './cadastro.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RedirectNewUserComponent } from './redirect-new-user/redirect-new-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CadastroComponent,
    RedirectNewUserComponent
  ]
})
export class CadastroModule { }
