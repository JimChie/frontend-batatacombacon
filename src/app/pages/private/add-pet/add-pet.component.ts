import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PetService } from 'src/app/services/pet.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { InputImageComponent } from 'src/app/shared/private/input-image/input-image.component';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { FormPetComponent } from 'src/app/shared/private/form-pet/form-pet.component';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {
  @ViewChild(AlertComponent) alert;
  @ViewChild(InputImageComponent) imageInput;
  @ViewChild(FormPetComponent) formPet;

  creatingNewPet: boolean=true;
  receivedForm: FormGroup;
  userId: number;

  constructor(
    private oauth: AuthService,
    private imageService: ImageService,
    private petService: PetService) { }

  ngOnInit () {
    this.oauth.userLogged.subscribe(ret => ret!==null ? this.userId = ret.id : this.userId=0)
   }

  receiveFormPet($event) {
    this.receivedForm = $event;
    //setando idUser aqui para manter o desacoplamento de componentes filhos
    this.receivedForm.patchValue({idUsuario: this.userId})

    // 1) é preciso criar um pet para depois adicionar a imagem
    this.petService.addPet(this.receivedForm.value).subscribe(
      retPet => {
        if(!!this.imageInput.croppedImage==true){ // a imagem não é obrigatória
          // 2) Enviando a imagem depois de criar o pet
          this.imageService.addPetImage(this.imageInput.croppedImage, retPet.id).subscribe(
            retImage => {},
            errorImage => {
              this.alert.show('danger', 'Problema ao enviar a imagem, mas o pet foi adicionado :D.');
              console.log(errorImage)
            }
          )
        }
        this.alert.show('success', 'Pet adicionado com sucesso.');
        this.imageInput.limparInput(); //limpa o input da imagem
        this.formPet.cleanForm(); //limpa form do pet
      },
      errorPet => {
        this.alert.show('danger', 'O pet não foi adicionado. Preencha todos os campos.');
        console.log(errorPet);
      }
    )
    
  }

}
