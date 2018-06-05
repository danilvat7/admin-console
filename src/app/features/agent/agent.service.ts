import { Injectable } from '@angular/core';
import { IAgent } from '../../core/models/agent.model';
import { HttpClientService } from '../../core/services/http-client.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';
import { Show } from '../../core/models/show.model';
import { IPartner } from '../../core/models/partner.model';
import { IListingObject } from '../../core/models/listing-object';
export interface AgentState {
  agentData: IAgent;
  sellers: IPartner[];
  buyers: IPartner[];
  fullListing: IListingObject[];
}
export const agentState: AgentState = {
  agentData: undefined,
  sellers: undefined,
  buyers: undefined,
  fullListing: undefined
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
    return this.http.get<IListingObject[]>(`listingsWithSeller/agent`, params);
  }

  getFullListing(params) {
    return this.http.get<IListingObject[]>('listings/all', params);
  }

  getShowingsBySellObj(params?) {
    return this.http.get<Show[]>(`showings/listing`, params);
  }

  getAgentShowings(params?) {
    return this.http.get<Show[]>(`showings/agent`, params);
  }

  getPrtners(params?) {
    return this.http.get<IPartner[]>(`clients/agent`, params);
  }

  saveSeller(data) {
    return this.http.post<any>('listing/setup', data);
  }

}
