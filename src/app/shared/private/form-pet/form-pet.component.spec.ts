import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormPetComponent } from './form-pet.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InputImageComponent } from '../input-image/input-image.component';

describe('FormPetComponent', () => {
  let component: FormPetComponent;
  let fixture: ComponentFixture<FormPetComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
        ImageCropperModule,
      ],
      declarations: [ 
        FormPetComponent,
        InputImageComponent
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FormPetComponent);

      component = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      component.ngOnInit();
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create empty petform', async(() => {
    expect(component.petForm.valid).toBeFalsy;
    expect(component.petForm.value).toBeFalsy;
  }));

  it('submit should emit message', async(() => {
    fixture.detectChanges();
    spyOn(component, 'submitPet');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    expect(component.submitPet).toHaveBeenCalled();
  }));
});
