import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { FormUserComponent } from './form-user.component';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
      ],
      declarations: [ 
        FormUserComponent
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FormUserComponent);

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

  it('should init a form', async(() => {
    expect(component.usuario.valid).toBeFalsy();
  }));

  it('submit should emit message', async(() => {
    fixture.detectChanges();
    spyOn(component, 'submitClick');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    expect(component.submitClick).toHaveBeenCalled();
  }));

  it('form should be invalid empty input', async(() => {
    component.usuario.controls['nome'].setValue('');
    component.usuario.controls['email'].setValue('');
    component.usuario.controls['senha'].setValue('');
    component.usuario.controls['confirmSenha'].setValue('');
    expect(component.usuario.controls['email'].valid).toBeFalsy();
    expect(component.usuario.controls['senha'].valid).toBeFalsy();
    expect(component.usuario.valid).toBeFalsy();
  }));
  it('form should be invalid email validator', async(() => {
    component.usuario.controls['email'].setValue('user');
    expect(component.usuario.controls['email'].valid).toBeFalsy();
    expect(component.usuario.valid).toBeFalsy();
  }));

  it('should trigger password match validators', async(() => {
    component.usuario.controls['senha'].setValue('123456');
    component.usuario.controls['confirmSenha'].setValue('123457');
    expect(component.usuario.controls['confirmSenha'].valid).toBeFalsy();
  }));

  it('form shold be valid', async(() => {
    component.usuario.controls['nome'].setValue('user');
    component.usuario.controls['email'].setValue('user@user.com');
    component.usuario.controls['senha'].setValue('123456');
    component.usuario.controls['confirmSenha'].setValue('123456');
    expect(component.usuario.valid).toBeTruthy();
  }));
});
