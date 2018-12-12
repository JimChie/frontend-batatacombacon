import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoFormsComponent } from './contato-forms.component';

xdescribe('ContatoFormsComponent', () => {
  let component: ContatoFormsComponent;
  let fixture: ComponentFixture<ContatoFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
