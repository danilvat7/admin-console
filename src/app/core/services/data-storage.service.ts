import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Agent} from '../../shared/agent.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private mlsAgent: any;

  constructor(private httpClient: HttpClient) {
  }

  public set agent(agent) {
    this.mlsAgent = agent;
  }

  public get agent() {
    return this.mlsAgent;
  }

  storeAgents() {
    // return this.httpClient.put('https://stagingmls.primeshowing.com/agents', this.agentService.getAgents());
  }

  getAgents() {
    this.httpClient.get<Agent[]>('https://stagingmls.primeshowing.com/agents.json')
      .pipe(map(
        (agents) => {
          for (const agent of agents) {
            if (!agents['phone']) {
              agent['phone'] = '';
            }
          }
          return agents;
        }
      ))
      .subscribe(
        (agents: Agent[]) => {
          // this.agentService.setAgents(agents);
        }
      );
  }
}
