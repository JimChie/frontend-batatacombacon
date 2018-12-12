import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pet } from 'src/app/classes/pets/pet';
import { PetService } from 'src/app/services/pet.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-pet-json',
  templateUrl: './pet-json.component.html',
  styleUrls: ['./pet-json.component.scss']
})
export class PetJsonComponent implements OnInit {

  pet: Pet;
  pageIdentifier: string;
  pageUrl: string;
  title = 'Salve um PET';

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private imageService: ImageService) { }

  ngOnInit() {
    
    this.pageIdentifier = this.route.snapshot.paramMap.get('id');
    this.getPet(+this.pageIdentifier);
    
    this.pageUrl = `https://procurandopets.disqus.com/${ this.pageIdentifier }`;
  }

  getPet(id: number): void {
    this.petService.getPet(id)
      .subscribe(pet => {
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
        
        this.pet = pet
      
      });
  }

  goBack(): void {
    this.location.back();
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
