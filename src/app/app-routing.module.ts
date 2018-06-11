import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AgentResolver } from './shared/resolvers/agent-resolver';
import { ApiUrlGuard } from './core/services/api-url.guard';
const appRoutes: Routes = [
  {
    path: 'mls',
    component: HomeComponent,
    children: [
      {
        path: ':mlsId/agents',
        loadChildren: './features/agents/agents.module#AgentsModule',
        canActivate: [ApiUrlGuard]

      }
    ]
  },
  {
    path: 'mls/:mlsId/agents/:id',
    loadChildren: './features/agent/agent.module#AgentModule',
    resolve: { agentData: AgentResolver },
    canActivate: [ApiUrlGuard]

  },
  {
    path: 'mls/:mlsId/agents/:id/create',
    loadChildren: './features/new-agent/new-agent.module#NewAgentModule',
    resolve: { agentData: AgentResolver },
    canActivate: [ApiUrlGuard]

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
