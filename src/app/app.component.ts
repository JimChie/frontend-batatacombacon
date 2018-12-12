import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private oAuthService: OAuthService) {
    this.oauthSetup();
  }
  
  oauthSetup() {
    this.oAuthService.requireHttps = false;
    this.oAuthService.tokenEndpoint = 'https://backendcombacon.herokuapp.com/oauth/token';
    this.oAuthService.userinfoEndpoint = 'https://backendcombacon.herokuapp.com/user/whoami';
    this.oAuthService.clientId = 'tokenAdmin';
    this.oAuthService.scope = 'openid profile email voucher offline_access';
    this.oAuthService.dummyClientSecret = 'TokenComBacon';
    this.oAuthService.oidc = false;
  }

}
