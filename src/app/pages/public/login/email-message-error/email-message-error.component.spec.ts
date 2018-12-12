import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMessageErrorComponent } from './email-message-error.component';

xdescribe('EmailMessageErrorComponent', () => {
  let component: EmailMessageErrorComponent;
  let fixture: ComponentFixture<EmailMessageErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailMessageErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMessageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
