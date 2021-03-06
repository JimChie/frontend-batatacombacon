import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputImageComponent } from './input-image.component';

xdescribe('InputImageComponent', () => {
  let component: InputImageComponent;
  let fixture: ComponentFixture<InputImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
