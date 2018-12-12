import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMessageSuccessComponent } from './email-message-success.component';

xdescribe('EmailMessageSuccessComponent', () => {
  let component: EmailMessageSuccessComponent;
  let fixture: ComponentFixture<EmailMessageSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailMessageSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMessageSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
