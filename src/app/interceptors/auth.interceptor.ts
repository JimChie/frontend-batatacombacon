import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {
        this.authService.isLogged.subscribe(state => this.isLogged = state);
    }
    
    isLogged: boolean=false;
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.isLogged){
            req = req.clone(
                {
                setHeaders: { 
                    Authorization: this.authService.getAuthorizationHeader()
                }
            });
        }
        
        return next.handle(req);
    }
    
}
