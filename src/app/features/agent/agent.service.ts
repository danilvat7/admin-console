import { Injectable } from '@angular/core';
import { IAgent } from '../../core/models/agent.model';
import { HttpClientService } from '../../core/services/http-client.service';
import { SellObject } from '../../core/models/sell-object.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';
import { Show } from '../../core/models/show.model';
import { Partner } from '../../core/models/partner.model';
export interface AgentState {
  agentData: IAgent;
  sellers: Partner[];
  buyers: Partner[];
}
export const agentState: AgentState = {
  agentData: undefined,
  sellers: undefined,
  buyers: undefined
};

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private subject = new BehaviorSubject<AgentState>(agentState);
  private agentState = this.subject.asObservable();

  constructor(private http: HttpClientService) {}

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.agentState.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

  getAgent(params?) {
    return this.http.get<{ data: IAgent }>(`agents`, params);
  }

  getAgentListing(params?) {
    return this.http.get<SellObject[]>(`mylistings/agent`, params);
  }

  getShowingsBySellObj(params?) {
    return this.http.get<Show[]>(`showings/listing`, params);
  }

  getAgentShowings(params?) {
    return this.http.get<Show[]>(`showings/agent`, params);
  }

  getPrtners(params?) {
    return this.http.get<Partner[]>(`clients/agent`, params);
  }
}
