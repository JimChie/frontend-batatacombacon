import { Component, HostListener, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/classes/usuario/usuario';


@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {

  imageSrc: String;
  // background = document.getElementsByClassName('preview-image-container');
  // img = document.getElementsByClassName('preview-image-url');
  showBtn: Boolean = true;
  closeBtn = document.getElementsByClassName('preview-image-btn-close');

  constructor(private fb: FormBuilder,
    private petService: PetService,
    private renderer: Renderer2,
    private userService: UserService,
    private usuario: Usuario ) { }

  ngOnInit () {
    this.usuario = this.userService.getUser(1);
  }

  petForm = this.fb.group({
    nome: ['', Validators.required],
    especie: ['', Validators.required],
    porte: ['', Validators.required],
    macho: ['', Validators.required],
    objetivo: ['', Validators.required],
    dataPet: ['', Validators.required],
    dataCriacao: ['2018-12-02'],
    localPet: ['', Validators.required],
    descricao: ['', Validators.required],
    imagem: ['', Validators.required],
    usuario: this.fb.group({
      email: [this.usuario.email],
      id: [this.usuario.id],
      nome: [this.usuario.nome],
      senha: [this.usuario.senha]
    }),
  });

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // const reader = new FileReader();
      // reader.onload =  (event) => {
      //   console.log('readfiles event ===== ', event);
      //   const fileReader = event.target as FileReader;
      //   let image = new Image();
      //   image.src = fileReader.result;
      //   image.insertAdjacentHTML( 'afterbegin' , 'class="preview-image-url" ');
      //   this.imagePreview.nativeElement.appendChild(image);
      // };
      // reader.readAsDataURL(file);
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      this.hideBtn();
      reader.readAsDataURL(file);
    }
  }

  hideBtn() {
    this.showBtn = !this.showBtn;
  }

  unPreviewFile() {
    this.imageSrc = '';
    this.hideBtn();
  }

// @ViewChild('imagePreview') imagePreview;

  // onDragOver(event: Event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.renderer.setStyle(this.background[0], 'background-color', '#999');
  // }

  // onDragLeave(event: Event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.renderer.setStyle(this.background[0], 'background-color', '#FFF');
  // }

  // onDrop(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.renderer.setStyle(this.background[0], 'background-color', '#FFF');
  //   let file = event.dataTransfer.files[0];
  //   let reader = new FileReader();
  //   reader.onload =  (event) => {
  //     console.log('readfiles event ===== ', event);
  //     const fileReader = event.target as FileReader;
  //     let image = new Image();
  //     image.src = fileReader.result;
  //     image.className = 'preview-image-url';
  //     console.log(document.getElementsByClassName('preview-image-container'));
  //     image.style = "display: block; margin: auto; width: 100%; height: 100%; max-width: 100%; max-height: 100%; position: absolute; top: 0; bottom: 0; left: 0; right: 0;";
  //     this.imagePreview.nativeElement.appendChild(image);
  //   };
  //   reader.readAsDataURL(file);
  // }

  ClickAddPet() {
    this.petService.addPet(this.petForm.value)
    .subscribe();
  }
}
