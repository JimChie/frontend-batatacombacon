import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DiscoverModule } from './public/discover/discover.module';
import { CadastroModule } from './public/cadastro/cadastro.module';
import { ContatoModule } from './public/contato/contato.module';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { LoginModule } from './public/login/login.module';
import { ProfileModule } from './private/profile/profile.module';
import { AddPetComponent } from './private/add-pet/add-pet.component';
import { EditPetComponent } from './private/edit-pet/edit-pet.component';
import { NovaSenhaComponent } from './private/nova-senha/nova-senha.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DiscoverModule,
    CadastroModule,
    ContatoModule,
    LoginModule,
    ProfileModule
  ],
  declarations: [ 
    PageNotFoundComponent,
    AddPetComponent,
    EditPetComponent,
    PageNotFoundComponent, 
    NovaSenhaComponent
  ]
})
export class PagesModule { }
