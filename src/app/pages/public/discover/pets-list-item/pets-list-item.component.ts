import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Pet } from 'src/app/classes/pets/pet';

@Component({
  selector: 'app-pets-list-item',
  templateUrl: './pets-list-item.component.html',
  styleUrls: ['./pets-list-item.component.scss']
})
export class PetsListItemComponent implements OnInit {

  @Input() petsFromService: Pet[];

  constructor(private location: Location) { }

  ngOnInit() {  }

  goBack(): void {
    this.location.back();
  }

  errorHandler(event) {
    event.target.src = "./assets/undraw_Cautious_dog_q83f.png";
 }
}
