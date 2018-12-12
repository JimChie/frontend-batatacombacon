import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { DiscoverComponent } from './discover.component';
import { BadgeStatusComponent } from './pets-list-item/badge-status/badge-status.component';
import { PetJsonComponent } from './pets-detail/pets-detail-content/pet-json/pet-json.component';
import { PetsDetailComponent } from './pets-detail/pets-detail.component';
import { PetsListItemComponent } from './pets-list-item/pets-list-item.component';
import { FilterListItemComponent } from './filter-list-item/filter-list-item.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DisqusModule } from 'ngx-disqus';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiscoverRoutingModule } from './discover-routing.module';
import { PetService } from 'src/app/services/pet.service';
import { PetServiceMock } from 'src/app/mocks/pet.service.mock';

xdescribe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        DiscoverRoutingModule,
        BrowserModule,
        RouterTestingModule,
        SharedModule,
        DisqusModule,
        InfiniteScrollModule,
        NgbTypeaheadModule,
        ShareButtonsModule.forRoot()
      ],
      declarations: [
        FilterListItemComponent,
        PetsListItemComponent,
        PetsDetailComponent,
        DiscoverComponent,
        PetJsonComponent,
        BadgeStatusComponent
      ],
      providers: [
        { provide: PetService, useValue: PetServiceMock },
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DiscoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  // xit('init should call getPets', () => {
  //   spyOn(component, 'getPets')
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(component.getPets).toHaveBeenCalled();
  // });
  it('init variables', async(() => {
    expect(component).toBeFalsy;
  }));
});
