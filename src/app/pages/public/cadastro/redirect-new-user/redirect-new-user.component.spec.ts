import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectNewUserComponent } from './redirect-new-user.component';

xdescribe('RedirectNewUserComponent', () => {
  let component: RedirectNewUserComponent;
  let fixture: ComponentFixture<RedirectNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectNewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
