import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-new-user',
  templateUrl: './redirect-new-user.component.html',
  styleUrls: ['./redirect-new-user.component.scss']
})
export class RedirectNewUserComponent implements OnInit {

  constructor(private router: Router) { }

  nome: string='';
  email: string='';

  ngOnInit() {

    this.router.routerState.root.data.subscribe(data => {
      this.nome = data.nome;
      this.email = data.email;
    })
  }

  redirectHome(){
    this.router.navigate([''])
  }

}
