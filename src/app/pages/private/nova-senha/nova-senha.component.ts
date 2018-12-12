import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmPasswordValidator } from 'src/app/shared/form-user/confirm-password.validator';
import { UserService } from 'src/app/services/user.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent implements OnInit {
  @ViewChild(AlertComponent) alert;

  novaSenhaForm: FormGroup;
  submitted = false;
  token: any;
  id: any;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( params => {
      this.id = params.id;
      this.token = params.token;
    });
    this.novaSenhaForm = this.formBuilder.group({
      id: [this.id],
      token: [this.token],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmSenha: ['', Validators.required]
    },{
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  get f() { return this.novaSenhaForm.controls; }

  clickConfirma($event) {
    this.submitted = true;
    if (this.novaSenhaForm.valid) {
      this.userService.changeUserPassword(this.novaSenhaForm).subscribe(
        ret => {
          this.alert.show('success', ret.message);
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 5000);
        },
        error => {
          this.alert.show('danger', error.message);
        }
      );
    }
  }

}
