import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(AlertComponent) alert;
  
  loginUser: FormGroup;
  submitted = false;
  
  constructor(private modalService: NgbModal, 
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder) { }
    
  // convenience getter for easy access to form fields
  get f() { return this.loginUser.controls; }
  
  ngOnInit() {
    this.loginUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }
  redirectToCadastro() {
    this.router.navigate(['cadastro']);
  }

  openEsqueceuSenha() {
    this.modalService.open(EsqueceuSenhaComponent, { centered: true });
  }

  submitClick($event) {
    // variavel que torna o botao de submit disponivel ou 
    // nao somente ao terminar todo o form
    this.submitted = true;

    if (this.loginUser.valid){
      this.authService
        .loginAuth(this.loginUser.controls['email'].value, this.loginUser.controls['senha'].value)
        .subscribe(
          ret => {
            this.router.navigate(['']);
          },
          error => {
            if(error.status===400){
              return this.alert.show('danger', 'Confira seu email e senha.');
            }
            
            return this.alert.show('danger', error.error.error_description);
          }
        );
    }
  }
}
