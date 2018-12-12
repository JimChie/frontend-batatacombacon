import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, from, Unsubscribable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError } from 'rxjs/operators';
import { UsuarioWhoami } from '../classes/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private logged = new BehaviorSubject<boolean>(false);
  private whoami = new BehaviorSubject<UsuarioWhoami>(null);
  
  constructor(private router: Router, 
              private oauth: OAuthService) { }

  loginAuth(user: string, pass: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.oauth.clientId + ':' + this.oauth.dummyClientSecret),
      'grant_type': 'password'
    });
    
    this.oauth.scope = 'password';

    return from(this.oauth.fetchTokenUsingPasswordFlowAndLoadUserProfile(user, pass, headers).then(
      result => {
        if(!!this.oauth.getAccessToken()){
          this.whoami.next(this.userInfo);
          this.logged.next(true);
        }else{
          catchError(this.handleError)
          //this.handleError(result)
        }
      }
    ));
  }

  logout(){
    this.oauth.logOut();
    this.logged.next(false);
    this.whoami.next(this.userInfo)
    this.router.navigate(['']);
  }

  getAuthorizationHeader() {
    return `Bearer ${this.oauth.getAccessToken()}`;
  }

  private get userInfo():UsuarioWhoami {
    const claims = this.oauth.getIdentityClaims();
    const user:UsuarioWhoami = {
      id: claims['id'],
      nome: claims['nome'],
      email: claims['email']
    }

    return user
  }

  get isLogged() {
    return this.logged.asObservable();
  }

  get userLogged() {
    return this.whoami.asObservable();
  }

  private handleError(error: any) { 
    return throwError(error);
  }

}
