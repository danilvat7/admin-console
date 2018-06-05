import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AgentService } from '../../features/agent/agent.service';

@Injectable({
  providedIn: 'root'
})
export class AgentResolver implements Resolve<any> {
  constructor(private agentService: AgentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): any {
    const { mlsId, id } = route.params;
    return this.agentService.getAgent({mlsId, id}).pipe(
      catchError(() => {
        alert(`Agent with id: ${id} doesn't exist!`);
        this.router.navigate([`/mls/${mlsId}/agents`]);
        return of(null);
      })
    );
  }
}
