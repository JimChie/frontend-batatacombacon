import { EmailMessageErrorComponent } from './../email-message-error/email-message-error.component';
import { EmailMessageSuccessComponent } from './../email-message-success/email-message-success.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.scss']
})
export class EsqueceuSenhaComponent implements OnInit {
  @Output() messageEvent = new EventEmitter();

  formEmail: FormGroup;
  submitted = false;


  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private userService: UserService, private modalService: NgbModal,) {}

  get f() { return this.formEmail.controls; }

  ngOnInit() {
    this.formEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendMessage(showMessage: Boolean, errorMessage: Boolean, message: string) {
    this.messageEvent.emit([showMessage, errorMessage, message]);
  }

  requestNovaSenha() {
    this.submitted = true;
    if (this.formEmail.valid) {
      this.userService.resetUserPassword(this.formEmail.get('email').value)
      .subscribe(
        ret => {
          this.modalService.open(EmailMessageSuccessComponent, { centered: true });
          setTimeout(() => {
            this.activeModal.close(EsqueceuSenhaComponent);
          }, 500);
        },
        error => {
          this.modalService.open(EmailMessageErrorComponent, { centered: true });
          setTimeout(() => {
            this.activeModal.close(EsqueceuSenhaComponent);
          }, 500);
        }
      );
    }
  }
}
