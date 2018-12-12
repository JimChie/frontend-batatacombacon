import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { NgbTypeaheadModule, NgbAccordionModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DisqusModule, DISQUS_SHORTNAME } from 'ngx-disqus';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PagesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbTypeaheadModule,
    NgbAlertModule,
    NgbAccordionModule,
    OAuthModule.forRoot(),
    ImageCropperModule,
    DisqusModule.forRoot('procurandopets')
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: DISQUS_SHORTNAME,
      useValue: 'procurandopets' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
