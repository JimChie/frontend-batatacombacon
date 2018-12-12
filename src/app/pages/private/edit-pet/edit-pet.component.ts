import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PetService } from 'src/app/services/pet.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Pet, APIPetFactory } from 'src/app/classes/pets/pet';
import { InputImageComponent } from 'src/app/shared/private/input-image/input-image.component';
import { FormPetComponent } from 'src/app/shared/private/form-pet/form-pet.component';
import { ImageService } from 'src/app/services/image.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss']
})
export class EditPetComponent implements OnInit {
  @ViewChild(AlertComponent) alert;
  @ViewChild(InputImageComponent) imageInput;
  @ViewChild(FormPetComponent) formPet;

  creatingNewPet: boolean=false; //estou criando um novo pet ?
  recemEditado: boolean=false; // quando atualizo a image, preciso dizer pro inputImage tirar o crop e mostrar a imagem normal.
  receivedForm: FormGroup; // form recebido do component
  pet: Pet;
  idPet: number;
  imagePet:any; // imagem do pet

  constructor(private petService: PetService,
      private imageService: ImageService,
      private activatedRoute: ActivatedRoute,
      private route: Router) { 
    this.activatedRoute.params.subscribe(params => this.idPet = params['id'])
  }

  ngOnInit () { 
    this.getPet();
  }

  imageSubject = new Subject<any>();
  receiveFormPet($event) {
    this.receivedForm = $event;
    this.petService.updatePet(this.receivedForm.value, this.idPet).subscribe(
      retPet => {
        
        if(!!this.imageInput.croppedImage==true){ // se tiver imagem, quer dizer que se quer atualizar
          this.imageService.addPetImage(this.imageInput.croppedImage, retPet.id).subscribe(
              retImage => {
                this.imageSubject.next(retImage)
              },
              errorImage => {
                this.alert.show('danger', 'Problema ao enviar a imagem, mas o pet foi editado :D.');
                console.log(errorImage)
              }
            ) 
          }

          //this.route.navigate(['profile'])
          this.imageSubject.subscribe(
            data => {
              this.recemEditado=true;
              //this.getPet()
              //this.alert.show('success', 'Pet editado com sucesso.');     
              this.route.navigate(['profile'])
            }
          )

        },
      errorPet => {
        this.alert.show('danger', 'Não foi possível editar o pet.');
        console.log(errorPet)
      }

    )
    
  }

  getPet(){ // get pet do banco
    this.petService.getPet(this.idPet)
    .subscribe(
      retPet => {
        this.pet = APIPetFactory(retPet);

        let lastImage = +retPet.fotos.sort()[retPet.fotos.length-1]
        if(lastImage!==NaN && lastImage!==undefined && !!lastImage!==false){
          this.imageService.getImage(lastImage).subscribe(
            retImage => {
              this.imagePet = URL.createObjectURL(retImage);
            },
            errorImage => {
              console.log(errorImage)
            }
          )
        }else{
          this.imagePet = '';
        }

      },
      errorPet => {
        console.log(errorPet);
      }
    );
  }
}
