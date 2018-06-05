import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentService } from './agent.service';
import { IAgent } from '../../core/models/agent.model';

@Component({
  selector: 'psh-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  agentData: IAgent;
  items: MenuItem[];
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private agentService: AgentService
  ) {}

  ngOnInit() {
    this.agentData = this.route.snapshot.data.agentData || {};

    const { mlsId, id } = this.route.snapshot.params;

    this.agentService.set('agentData', this.agentData);

    this.agentService.getPrtners({ id, type: 'SELLER' }).subscribe(response => {
      this.agentService.set('sellers', response);
    });

    this.agentService.getPrtners({ id, type: 'BUYER' }).subscribe(response => {
      this.agentService.set('buyers', response);
    });

    this.agentService.getFullListing({mlsId}).subscribe(response => {
      const data = response.map(item => {
        return {
          address: `${item.streetNumber} ${item.streetName} ${item.city} ${item.state} ${item.zipCode}`,
          ...item
        };
      });
      this.agentService.set('fullListing', data);
    });

    this.items = [
      {
        label: `Agent's Listing`,
        routerLink: [`/mls/${mlsId}/agents/${id}/listing`],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Scheduling',
        routerLink: [`/mls/${mlsId}/agents/${id}/scheduling`],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: `Agent's Showing`,
        routerLink: [`/mls/${mlsId}/agents/${id}/showing`],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: `Agents's Admin`,
        routerLink: [`/mls/${mlsId}/agents/${id}/admin`],
        routerLinkActiveOptions: { exact: true }
      }
    ];
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      mlsId: [this.agentData.mlsId, [Validators.required]],
      firstName: [this.agentData.firstName, [Validators.required]],
      lastName: [this.agentData.lastName, Validators.required],
      phone: [this.agentData.phone, Validators.required],
      email: [this.agentData.email, [Validators.required, Validators.email]]
    });
  }
}
