import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListItemComponent } from './filter-list-item.component';

xdescribe('FilterListItemComponent', () => {
  let component: FilterListItemComponent;
  let fixture: ComponentFixture<FilterListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
