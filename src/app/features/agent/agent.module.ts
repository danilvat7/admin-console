import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {CommonModule} from '@angular/common';
import {AgentRoutingModule} from './agent-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AgentComponent} from './agent.component';
import { ListingComponent } from './listing/listing.component';
import {TabMenuModule} from 'primeng/primeng';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { ShowingComponent } from './showing/showing.component';
import { AdminComponent } from './admin/admin.component';
import { SellersListComponent } from './listing/sellers-list/sellers-list.component';
import { BuyersListComponent } from './listing/buyers-list/buyers-list.component';
import { EditSellerFormComponent } from './listing/edit-seller-form/edit-seller-form.component';
import { ShowingsListComponent } from './showing/showings-list/showings-list.component';
import { EditBuyerFormComponent } from './showing/edit-buyer-form/edit-buyer-form.component';

@NgModule({
  declarations: [
    AgentComponent,
    ListingComponent,
    SchedulingComponent,
    ShowingComponent,
    AdminComponent,
    SellersListComponent,
    BuyersListComponent,
    EditSellerFormComponent,
    ShowingsListComponent,
    EditBuyerFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgentRoutingModule,
    SharedModule,
    TabMenuModule
  ]
})
export class AgentModule {}
