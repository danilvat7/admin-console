import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Agent } from '../../../shared/agent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../../core/services/data-storage.service';
import { AgentsService } from '../agents.service';

@Component({
  selector: 'psh-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss']
})
export class AgentsListComponent implements OnInit, OnDestroy {
  agents: any;
  // choosenAgent: any;
  // agentActions: MenuItem[];
  // currentId: string;
  cols: any[];

  chooseOptions = [
    { name: 'New agent', value: 'create' },
    { name: 'Existing Agent', value: 'existing' }
  ];

  constructor(
    private agentsService: AgentsService,
    private dataService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.agentSubscription = this.agentService.agentChanged
    //   .subscribe(
    //     (agents: Agent[]) => {
    //       this.agents = agents;
    //     }
    //   );
    // this.agents = this.agentService.getAgents();

    // this.agentActions = [
    //   {
    //     label: 'New Agent',
    //     icon: 'fa-plus',
    //     command: () => {
    //       this.newAgent();
    //     }
    //   }
    // ];

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'phone', header: 'Phone Number' },
      { field: 'email', header: 'Email' },
      { field: 'status', header: 'Status' },
      { field: 'mlsAgentId', header: 'Action' }
    ];

    const mlsId = this.route.snapshot.params.mlsId;

    this.agentsService.getAgentsListByMLS({mlsId}).subscribe(data => {
      this.agents = data;
    });
  }

  ngOnDestroy() {
    // this.agentSubscription.unsubscribe();
  }

  // onAgentChoose(agent) {
  //   this.dataService.agent = agent;
  //   this.router.navigate([`${agent.mlsAgentId}`], { relativeTo: this.route });
  //   console.log('choose agent id: ', agent.mlsAgentId);
  // }

  // saveCurrentId(agent) {
  //   this.choosenAgent = agent;
  // }

  // newAgent() {
  //   console.log(this.currentId);
  //   this.dataService.agent = this.choosenAgent;
  //   this.router.navigate([`${this.choosenAgent.mlsAgentId}/create`], {
  //     relativeTo: this.route
  //   });
  // }

  onChooseChage(option, agent: any) {
    this.dataService.agent = agent;
    const path = option.value.value === 'create' ? '/create' : '';
    this.router.navigate([`${agent.mlsAgentId}${path}`], {
      relativeTo: this.route
    });
  }
}
