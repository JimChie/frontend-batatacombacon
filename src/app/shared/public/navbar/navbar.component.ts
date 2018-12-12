import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UsuarioWhoami } from 'src/app/classes/usuario/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogged$: Observable<boolean>;
  userLogged$: Observable<UsuarioWhoami>;
  navbarOpen = false;

  constructor(private authService: AuthService) {  }

  ngOnInit() {
    this.isLogged$ = this.authService.isLogged;
    this.userLogged$ = this.authService.userLogged;
  }
  
  onLogout(){
    this.authService.logout();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
}
