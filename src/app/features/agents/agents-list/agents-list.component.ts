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
  loading = true;
  agents: any;
  cols: any[];

  constructor(
    private agentsService: AgentsService,
    private dataService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
      this.loading = false;
    }, error => this.loading = false);
  }

  ngOnDestroy() {
  }


  onChooseChage(option, agent: any) {
    this.dataService.agent = agent;
    const path = option.value.value === 'create' ? '/create' : '';
    this.router.navigate([`${agent.id}${path}`], {
      relativeTo: this.route
    });
  }

  actionEvent(path, agent: any) {
    this.dataService.agent = agent;
    this.router.navigate([`${agent.id}/${path}`], {
      relativeTo: this.route
    });
  }
}
