import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { Usuario } from 'src/app/classes/usuario/usuario';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit, OnChanges {
  
  @Input() usuarioProfile: Usuario;
  @Input() btnText: string;
  @Output() messageEvent = new EventEmitter<FormGroup>();
  
  usuario: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder) { }
    
    // convenience getter for easy access to form fields
    get f() { return this.usuario.controls; }
    
    ngOnInit() {
      this.usuario = this.formBuilder.group({
        nome: ['', Validators.required],
        sobrenome: [''],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmSenha: ['', Validators.required]
      },{
        validator: ConfirmPasswordValidator.MatchPassword
      });
    }

    ngOnChanges(changes: SimpleChanges) {

      // verificando se usuarioProfile esta na lista de changese e se ele nao for nulo
      // se ele for nulo quer dizer que é um cadastro novo. Não tem que preencher.
      if("usuarioProfile" in changes && this.usuarioProfile!==undefined){
        this.fillUsuario();
      }
    }

    fillUsuario(){ //preenche o form quando faz a edição
      this.usuario.patchValue({
        nome: this.usuarioProfile.nome,
        email: this.usuarioProfile.email,
        senha: "",
        confirmSenha: ""
      });
    }
   
    sendMessage() {
      this.messageEvent.emit(this.usuario);
    }
    
    submitClick($event) {
      // variavel que torna o botao de submit disponivel ou 
      // nao somente ao terminar todo o form
      this.submitted = true; 
      
      if (this.usuario.valid)
        this.sendMessage();
    }
  }
  