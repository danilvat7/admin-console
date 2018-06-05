import {Injectable} from '@angular/core';
import { IAgent } from '../../core/models/agent.model';
import { AgentsModule } from '../../features/agents/agents.module';
import { HttpClientService } from '../../core/services/http-client.service';

@Injectable()
export class AgentsService {
  constructor(private http: HttpClientService) {
  }

  public getAgentsListByMLS(params?) {
   return this.http.get<{data: IAgent[]}>(`agents/all`, params);
  }
}
