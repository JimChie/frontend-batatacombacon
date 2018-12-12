import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { FilterPets } from 'src/app/classes/filter';
import { Pet } from 'src/app/classes/pets/pet';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  pets:Pet[] = [];
  filterContent: FilterPets;
  page = 0;
  numberOfElements = 6;
  end: boolean;
  filtred: boolean=false;

  constructor(private petService: PetService, private imageService: ImageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getPets(this.page, this.numberOfElements);
  }

  getPets(page: number, size: number) {
    this.petService.getPetsScroll(page, size).subscribe(
        pets => {
          pets.content.map(pet => {
            this.pets.push(pet)
            // get image from database
            let lastImage = +pet.fotos.sort()[pet.fotos.length-1]
            this.imageService.getImage(lastImage).subscribe(
              retImage => {
                pet.photoLink = this.sanitize(URL.createObjectURL(retImage));
              },
              errorImage => {
                pet.photoLink = './assets/undraw_Cautious_dog_q83f.png'
              }
            )
            // get image from database
          });
          this.end = pets.last;
      },
        error => console.log(error)
      );
  }

  receiveMessage($event) {
    this.page = 0;
    this.pets = [];
    this.filtred = true;
    this.filterContent = $event
    this.filterPets($event);
  }

  filterPets(params: FilterPets):void {
    this.petService.getPetsByFilterScroll(params, this.page, this.numberOfElements)
      .subscribe(
        pets => {
          pets.content.map(pet => {
            this.pets.push(pet)
            // get image from database
            let lastImage = +pet.fotos.sort()[pet.fotos.length-1]
            this.imageService.getImage(lastImage).subscribe(
              retImage => {
                pet.photoLink = this.sanitize(URL.createObjectURL(retImage));
              },
              errorImage => {
                pet.photoLink = './assets/undraw_Cautious_dog_q83f.png'
              }
            )
            // get image from database
          });     
          this.end = pets.last;
      },
        error => console.log(error)
      );
  }

  onScroll() {
    if (!this.end) {
      this.page++;
      if (this.filtred) {
        this.filterPets(this.filterContent);
      } else {
        this.getPets(this.page, this.numberOfElements);
      }
    } else {
      this.filtred = false;
    }
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
