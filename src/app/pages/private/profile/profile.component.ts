import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario, APIUsuarioFactory } from 'src/app/classes/usuario/usuario';
import { Pet, PetPagination } from 'src/app/classes/pets/pet';
import { FormGroup } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PetService } from 'src/app/services/pet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(AlertComponent) alert;
  
  usuario: Usuario;
  receivedForm: FormGroup;
  pets: Pet[]=[];
  
  closeResult: string;
  
  constructor(private userService: UserService,
    private petService: PetService,
    private oauth: AuthService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer) { }
    
  ngOnInit() {
    this.oauth.userLogged.subscribe(ret => {
      this.userService.getUser(ret.id).subscribe(user => {
        this.usuario = APIUsuarioFactory(user)
        
        //setando id para que eu saiba quem eu vou editar
        this.usuario.id = ret.id;
      });
      
      // loading pets of user
      this.getPetsUser(ret.id);
      
    });
    
  }
    
    // criada função pois é usada no init e no delete do pet
  getPetsUser(idUser: number){
    this.userService.getPetsUser(idUser)
    .subscribe(
      pets => {
        pets.content.map(pet =>{
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
        })
        this.pets = pets.content;
      },
      error => this.alert.show('info', 'Nenhum pet foi encontrado.')
      )
    }
      
  receiveClickEditUser($event) {
    this.receivedForm = $event;
    
    // 1) Aqui tem a conversao de form para usuario. è necessario o id e o form nao tem id.
    const sendUser = APIUsuarioFactory(this.usuario)
    sendUser.nome = this.getFormValues('nome');
    sendUser.email = this.getFormValues('email');
    sendUser.senha = this.getFormValues('senha');
    
    // 2) no subscribe vai o retorno da request. Mesmo ainda retornando undefined, o user é adicionado
    this.userService.updateUser(sendUser)
    .subscribe(
      ret => {
        //console.log(ret)
        this.alert.show('success', 'Usuário alterado com sucesso.');
      },
      error => {
        //console.log(error)
        this.alert.show('danger', error.error.message );
      });
    }
        
  getFormValues(att){
    return this.receivedForm.controls[att].value;
  }
  
  msgDeletePet($event){
    this.petService.deletePet($event)
    .subscribe(
      ret => {
        this.getPetsUser(this.usuario.id);
        this.alert.show('success', ret.message);
      },
      error => this.alert.show('danger', error.message)
      )
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
        