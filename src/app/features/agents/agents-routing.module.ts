import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgentsComponent} from './agents.component';
import {AgentsListComponent} from './agents-list/agents-list.component';

const routes: Routes = [
  {
    path: '',
    component: AgentsComponent,
    children: [
      {path: '', component: AgentsListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule {
}
