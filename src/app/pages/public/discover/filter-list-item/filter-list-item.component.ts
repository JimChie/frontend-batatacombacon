import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { FilterPets } from 'src/app/classes/filter';

import { ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { Especie } from 'src/app/classes/especie/especies';
import { Porte } from 'src/app/classes/porte/porte';
import { Objetivo } from 'src/app/classes/objetivo/objetivo';
import { Sexo } from 'src/app/classes/sexo/sexo';

@Component({
  selector: 'app-filter-list-item',
  templateUrl: './filter-list-item.component.html',
  styleUrls: ['./filter-list-item.component.scss']
})
export class FilterListItemComponent implements OnInit {
  
  especies: Especie[]=[];
  portes: Porte[]=[];
  objetivos: Objetivo[]=[];
  sexos: Sexo[]=[];

  selectedEspecie: string;
  @ViewChild('instanceEspecie') instanceEspecie: NgbTypeahead;
  focusEspecie$ = new Subject<string>();
  clickEspecie$ = new Subject<string>();

  searchEspecies = (text$: Observable<string>) => {
    return merge(text$.pipe(debounceTime(200), distinctUntilChanged()),
                 this.focusEspecie$, 
                 this.clickEspecie$.pipe(filter(() => !this.instanceEspecie.isPopupOpen()))
                 ).pipe(
                        map(term => (
                              term === '' ? this.especies.map(m => m.descricao) : this.especies.map(m => m.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
                            )
                        );
  }

  selectedPorte: string;
  @ViewChild('instancePorte') instancePorte: NgbTypeahead;
  focusPorte$ = new Subject<string>();
  clickPorte$ = new Subject<string>();

  searchPortes = (text$: Observable<string>) => {
    return merge(text$.pipe(debounceTime(200), distinctUntilChanged()),
                 this.focusPorte$, 
                 this.clickPorte$.pipe(filter(() => !this.instancePorte.isPopupOpen()))
                 ).pipe(
                        map(term => (
                              term === '' ? this.portes.map(m => m.descricao) : this.portes.map(m => m.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
                            )
                        );
  }
 
  selectedObjetivo: string;
  @ViewChild('instanceObjetivo') instanceObjetivo: NgbTypeahead;
  focusObjetivo$ = new Subject<string>();
  clickObjetivo$ = new Subject<string>();

  searchObjetivos = (text$: Observable<string>) => {
    return merge(text$.pipe(debounceTime(200), distinctUntilChanged()),
                 this.focusObjetivo$, 
                 this.clickObjetivo$.pipe(filter(() => !this.instanceObjetivo.isPopupOpen()))
                 ).pipe(
                        map(term => (
                              term === '' ? this.objetivos.map(m => m.descricao) : this.objetivos.map(m => m.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
                            )
                        );
  }
 
  selectedSexo: string;
  @ViewChild('instanceSexo') instanceSexo: NgbTypeahead;
  focusSexo$ = new Subject<string>();
  clickSexo$ = new Subject<string>();

  searchSexos = (text$: Observable<string>) => {
    return merge(text$.pipe(debounceTime(200), distinctUntilChanged()),
                 this.focusSexo$, 
                 this.clickSexo$.pipe(filter(() => !this.instanceSexo.isPopupOpen()))
                 ).pipe(
                        map(term => (
                              term === '' ? this.sexos.map(m => m.descricao) : this.sexos.map(m => m.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
                            )
                        );
  }
 
  @Output() messageEvent = new EventEmitter<string>();
  
  filterParams =  new FilterPets();

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.getEspecies();
    this.getPortes();
    this.getObjetivos();
    this.getSexos();
  }

  getEspecies(): void {
    this.filterService.getEspecies()
      .subscribe(especies_ => this.especies = especies_);
  }

  getPortes(): void {
    this.filterService.getPortes()
      .subscribe(portes_ => this.portes = portes_);
  }

  getObjetivos(): void {
    this.filterService.getObjetivos()
      .subscribe(objetivos_ => this.objetivos = objetivos_);
  }

  getSexos(): void {
    this.filterService.getSexos()
      .subscribe(sexos_ => this.sexos = sexos_);
  }

  filtraPetsClick() {
    this.filterParams["especie"] = this.especies.filter(x => x.descricao == this.selectedEspecie).map(m => m.name)[0];
    this.filterParams["porte"] = this.portes.filter(x => x.descricao == this.selectedPorte).map(m => m.name)[0];
    this.filterParams["objetivo"] = this.objetivos.filter(x => x.descricao == this.selectedObjetivo).map(m => m.name)[0];
    this.filterParams["sexo"] = this.sexos.filter(x => x.descricao == this.selectedSexo).map(m => m.name)[0];

    this.sendMessage(this.filterParams);
  }

  limpaFiltros(){
    this.selectedEspecie = '';
    this.selectedObjetivo = '';
    this.selectedPorte= '';
    this.selectedSexo = '';
  }

  sendMessage(selecteds) {
    this.messageEvent.emit(selecteds);
  }
}