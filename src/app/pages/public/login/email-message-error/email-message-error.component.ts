import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-email-message-error',
  templateUrl: './email-message-error.component.html',
  styleUrls: ['./email-message-error.component.scss']
})
export class EmailMessageErrorComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
