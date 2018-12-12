import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent implements OnInit, OnChanges {
  
  @Input() imagePetEdit:any;
  @Input() creatingNewPet:boolean; //serve tambem para desablitar o botão de remover imagem quando o pet est sendo editado
  @Input() recemEditado:boolean;

  srcImage: any; // caminho da imagem

  imgHide:boolean=true;
  imgCropHide:boolean=true;

  // a cada redimensionada, o croppedImage é preenchido com a nova imagem.
  croppedImage: any = '';
  imageChangedEvent: any = '';

  ngOnChanges(changes: SimpleChanges): void {
    if("imagePetEdit" in changes || "creatingNewPet" in changes){
      if(this.creatingNewPet){
        this.srcImage= './assets/undraw_Cautious_dog_q83f.png';
        this.imgHide=false;
      }else{
        this.imgCropHide=true;
        if(!!this.imagePetEdit==true){// se tiver imagem
          
          this.srcImage = this.sanitize(this.imagePetEdit)
          this.imgHide=false;

        }else{
          this.srcImage= './assets/undraw_Cautious_dog_q83f.png';
          this.imgHide=false;
        }
      }
    }
  }

  ngOnInit() {}

  constructor(private sanitizer: DomSanitizer) {}
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

    this.imgHide=true;
    this.imgCropHide=false;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.file;
  }

  imageLoaded() {
    this.imgHide=true;
  }

  loadImageFailed() {}

  limparInput(){
    this.imageChangedEvent='';
    this.croppedImage='';
    this.imgCropHide=true;
    this.imgHide=false;
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
  