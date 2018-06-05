import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../../auth/auth-guard.service';
import {AgentComponent} from './agent.component';
import {ListingComponent} from './listing/listing.component';
import {SchedulingComponent} from './scheduling/scheduling.component';
import {ShowingComponent} from './showing/showing.component';
import {AdminComponent} from './admin/admin.component';

const agentRoutes: Routes = [
  {
    path: '', component: AgentComponent, children: [
      {path: '', redirectTo: 'listing', pathMatch: 'full'},
      {path: 'listing', component: ListingComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'scheduling', component: SchedulingComponent},
      {path: 'showing', component: ShowingComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(agentRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AgentRoutingModule {
}
