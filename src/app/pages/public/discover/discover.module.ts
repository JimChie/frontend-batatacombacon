import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { FilterListItemComponent } from './filter-list-item/filter-list-item.component';
import { PetsListItemComponent } from './pets-list-item/pets-list-item.component';
import { PetsDetailComponent } from './pets-detail/pets-detail.component';
import { DiscoverComponent } from './discover.component';
import { PetJsonComponent } from './pets-detail/pets-detail-content/pet-json/pet-json.component';
import { DiscoverRoutingModule } from './discover-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BadgeStatusComponent } from './pets-list-item/badge-status/badge-status.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { DisqusModule } from 'ngx-disqus';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    DiscoverRoutingModule,
    FormsModule,
    SharedModule,
    DisqusModule,
    InfiniteScrollModule,
    NgbTypeaheadModule,
    ShareButtonsModule.forRoot()
  ],
  exports: [],
  declarations: [
    FilterListItemComponent,
    PetsListItemComponent,
    PetsDetailComponent,
    DiscoverComponent,
    PetJsonComponent,
    BadgeStatusComponent
  ]
})
export class DiscoverModule { }
