import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from 'src/app/classes/pets/pet';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {

  @Input() petListUser: Pet[];
  @Output() msgDeletePet = new EventEmitter<number>();

  constructor(private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  infoPet($event){
    this.router.navigate([`editpet/${$event}`]);
  }

  deletePet($event, content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-title'}).result.then(
      (result) => {
        if(result==='ok'){
          this.msgDeletePet.emit($event);
        }
      },
      (reason) => {}
    );

  }

}
