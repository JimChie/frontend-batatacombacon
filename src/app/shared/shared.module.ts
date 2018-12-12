import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './public/navbar/navbar.component';
import { FooterComponent } from './public/footer/footer.component';
import { FormUserComponent } from './form-user/form-user.component';
import { LoaderComponent } from './public/loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { FormPetComponent } from './private/form-pet/form-pet.component';
import { InputImageComponent } from './private/input-image/input-image.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ImageCropperModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    FormUserComponent,
    LoaderComponent,
    AlertComponent,
    FormPetComponent,
    InputImageComponent
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    FormUserComponent,
    LoaderComponent,
    AlertComponent,
    FormPetComponent,
    InputImageComponent
  ]

})
export class SharedModule { }
