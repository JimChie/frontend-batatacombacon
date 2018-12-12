import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetJsonComponent } from './pet-json.component';

xdescribe('PetJsonComponent', () => {
  let component: PetJsonComponent;
  let fixture: ComponentFixture<PetJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
