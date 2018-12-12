import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Pet } from 'src/app/classes/pets/pet';
import { FilterService } from 'src/app/services/filter.service';
import { Especie } from 'src/app/classes/especie/especies';
import { Objetivo } from 'src/app/classes/objetivo/objetivo';
import { Porte } from 'src/app/classes/porte/porte';
import { Sexo } from 'src/app/classes/sexo/sexo';
import { CepService } from 'src/app/services/cep.service';
import { EnderecoAjax } from 'src/app/classes/cep/cep';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-pet',
  templateUrl: './form-pet.component.html',
  styleUrls: ['./form-pet.component.scss']
})
export class FormPetComponent implements OnInit, OnChanges {

  @Input() petToEdit: Pet;
  @Input() buttonText: string;
  @Output() messageEvent = new EventEmitter<FormGroup>();
  
  cepSubject: Subject<string> = new Subject();
  wsCep: EnderecoAjax;
  loadingCep: boolean=false;

  petForm: FormGroup;
  submitted = false;

  especies: Especie[]=[];
  objetivos: Objetivo[]=[];
  portes: Porte[]=[];
  sexos: Sexo[]=[];

  constructor(
    private formBuilder: FormBuilder, 
    private filterService: FilterService,
    private cepService: CepService) { }

  get f() {
    return this.petForm.controls;
  }

  ngOnInit() {
    this.fillOptions(); //preenche options
    this.startForm(); // monta validators pro form
    this.cepSubject.pipe(debounceTime(1000)).subscribe(cep => this.getCep(cep)); // arma o buscaCep
  }

  ngOnChanges(changes: SimpleChanges) {
    // verificando se usuarioProfile esta na lista de changese e se ele nao for nulo
    // se ele for nulo quer dizer que é um cadastro novo. Não tem que preencher.
    if("petToEdit" in changes && this.petToEdit!==undefined){
      this.fillPet();
    }
  }

  fillPet() {
    this.petForm.patchValue({
          nome: this.petToEdit.nome,
          especie: this.petToEdit.especie,
          porte: this.petToEdit.porte,
          sexo: this.petToEdit.sexo,
          objetivo: this.petToEdit.objetivo,
          descricao: this.petToEdit.descricao,
          fotos: this.petToEdit.fotos,
          idUsuario: this.petToEdit.idUsuario,
          localPet: this.petToEdit.localPet
        });
  }

  sendMessage() {
    this.messageEvent.emit(this.petForm);
  }

  submitPet($event) {
    // variavel que torna o botao de submit disponivel ou 
    // nao somente ao terminar todo o form
    this.submitted = true;

    if ( this.petForm.valid ) {
      this.sendMessage();
    }
  }

  startForm() {
    this.petForm = this.formBuilder.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      porte: ['', Validators.required],
      sexo: ['', Validators.required],
      objetivo: ['', Validators.required],
      descricao: [''],
      fotos: [],
      idUsuario: [0],
      localPet: this.formBuilder.group({
        cep: [''],
        rua: ['', Validators.required],
        bairro: [''],
        numero: [''],
        cidade: ['', Validators.required],
        uf: ['', Validators.required],
        complemento: [''],
        referencia: ['']
      })
      
    });
  }

  cleanForm() {
    // reset nao funciona por conta das validações
    this.petForm.patchValue({
      nome: [''],
      especie: [''],
      porte: [''],
      sexo: [''],
      objetivo: [''],
      descricao: [''],
      fotos: [],
      idUsuario: [0],
      localPet: {
        cep: [''],
        rua: [''],
        bairro: [''],
        numero: [''],
        cidade: [''],
        uf: [''],
        complemento: [''],
        referencia: ['']
      }
    });
  }

  fillOptions(){
    this.filterService.getEspecies().subscribe( ret => this.especies = ret, error => console.log(error))
    this.filterService.getObjetivos().subscribe( ret => this.objetivos = ret, error => console.log(error))
    this.filterService.getPortes().subscribe( ret => this.portes = ret, error => console.log(error))
    this.filterService.getSexos().subscribe( ret => this.sexos = ret, error => console.log(error))
  }

  getCep(cep: string){
    this.loadingCep=true;
    
    this.cepService.getCepJsonp(cep)
    .subscribe(
      ret => {
        this.petForm.patchValue({
          localPet: {
            rua: ret.logradouro,
            bairro: ret.bairro,
            cidade: ret.localidade,
            uf: ret.uf
          }
          
        });
        this.loadingCep=false;
      }, 
      error => {
        this.loadingCep=false;
      })
  }

  keyUp(event) {
    if(event!==''){
      this.loadingCep=true;
      this.cepSubject.next(event.target.value);
    }
  }

}
