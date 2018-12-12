import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge-status',
  templateUrl: './badge-status.component.html',
  styleUrls: ['./badge-status.component.scss']
})

export class BadgeStatusComponent implements OnInit {

  @Input() childObjetivo: string;

  constructor() { }

  ngOnInit() {
  }

  setClass(bdgColor){
    const classValues = {
      'badge': true,
      //'float-right': true,
      'badge-success': false,
      'badge-danger': false,
      'badge-warning': false,
      'badge-info': false
    }

    if(bdgColor==="ENCONTRADO")
      classValues["badge-success"] = true
    else if(bdgColor==="PERDIDO")
      classValues["badge-danger"] = true
    else if(bdgColor==="DOACAO")
      classValues["badge-warning"] = true
    else
      classValues["badge-info"] = true // só para não deixar em branco caso não tenha.
    
    return classValues
  }

}
