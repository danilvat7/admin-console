import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentsComponent} from './agents.component';
import {AgentsRoutingModule} from './agents-routing.module';
import {AgentsListComponent} from './agents-list/agents-list.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { AgentsService } from './agents.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgentsRoutingModule,
    SharedModule
  ],
  declarations: [AgentsComponent, AgentsListComponent],
  providers: [AgentsService]
})
export class AgentsModule {
}
