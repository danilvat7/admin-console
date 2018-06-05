import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AgentResolver } from './shared/resolvers/agent-resolver';

const appRoutes: Routes = [
  {
    path: 'mls',
    component: HomeComponent,
    children: [
      {
        path: ':mlsId/agents',
        loadChildren: './features/agents/agents.module#AgentsModule'

      }
    ]
  },
  {
    path: 'mls/:mlsId/agents/:id',
    loadChildren: './features/agent/agent.module#AgentModule',
   resolve: { agentData: AgentResolver }
  },
  {
    path: 'mls/:mlsId/agents/:id/create',
    loadChildren: './features/new-agent/new-agent.module#NewAgentModule'
  },
  { path: '**', redirectTo: '/mls' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
