import { Component, OnInit } from '@angular/core';

// tempo para fechar
const closeTime = 5000;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor() { }

  alertClosed = true;
  alertType: string;
  alertMessage: string;

  ngOnInit() { }

  show(type:string, message: string=''){

    if(type=='success' && message=='')
      message = 'Operação realizada com sucesso.';
    
    if(type=='danger'&& message=='')
      message = 'Ops! Aconteceu algo de errado.';
    
    this.alertType = type;
    this.alertMessage = message;

    this.alertClosed = false;

    // esse é o timer pra fechar.
    setTimeout(() => this.alertClosed = true, closeTime);

  }

}
