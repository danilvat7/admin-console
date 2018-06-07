import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Subscription } from 'rxjs/Subscription';
import { IAgent } from '../../../core/models/agent.model';
@Component({
  selector: 'psh-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.css']
})
export class ShowingComponent implements OnInit {
  loading = true;
  agentId: string | number;
  // todo create model
  showingsList: any;
  subscription: Subscription;
  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.subscription = this.agentService
      .select<IAgent>('agentData')
      .subscribe(data => {
        if (data) {
          this.agentId = data.id;
          this.agentService
            .getAgentShowings({ id: this.agentId })
            .subscribe(response => {
              const { future = [], today = [], past = [] } = response;
              this.showingsList = [...future, ...today, ...past];
              this.loading = false;
            }, error => (this.loading = false));
        }
      });
  }
}
