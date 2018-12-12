import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router){
    this.authService.isLogged.subscribe(state => this.isLogged = state);
  }
  
  isLogged: boolean=false;
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.isLogged){
      return true;
    }
    
    this.router.navigate(['']);
    return false;
      
    }
  }
  