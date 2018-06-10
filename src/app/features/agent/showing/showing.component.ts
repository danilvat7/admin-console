import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Subscription } from 'rxjs/Subscription';
import { IAgent } from '../../../core/models/agent.model';
import { ToasterService } from '../../../core/services/toaster.service';
@Component({
  selector: 'psh-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.css']
})
export class ShowingComponent implements OnInit {
  loading = true;
  agentData: IAgent;
  // todo create model
  showingsList: any;
  subscription: Subscription;
  constructor(private agentService: AgentService, private toasterService: ToasterService) {}

  ngOnInit() {
    this.subscription = this.agentService
      .select<IAgent>('agentData')
      .subscribe(data => {
        if (data) {
          this.agentData = data;
          this.getAgentShowings();
        }
      });
  }
  getAgentShowings() {
    this.agentService
      .getAgentShowings({ id: this.agentData.id })
      .subscribe(response => {
        this.showingsList = response.map(item => {
          return {
            address: item.listing && `${item.listing.streetNumber} ${
              item.listing.streetName
            } ${item.listing.city} ${item.listing.state} ${
              item.listing.zipCode
            }`,
            buyerName: item.buyersAgent && `${item.buyersAgent.firstName} ${item.buyersAgent.lastName}`,
            buyerEmail: item.buyersAgent && `${item.buyersAgent.email}`,
            buyerPhone: item.buyersAgent && `${item.buyersAgent.phone}`,
            notificationType: item.buyersAgent && `${item.buyersAgent.notificationType.join(' ')}`,
            ...item
          };
        });
        this.loading = false;
      }, error => (this.loading = false));
  }
  onCancelShowing(item) {
    this.loading = true;
    const params = {
      showingId: item.id,
      initiatorHash: this.agentData.hash
    };
    this.agentService.cancelShowing({}, params).subscribe(
      _ => {
        this.toasterService.showMessage();
        this.getAgentShowings();
      },
      error => {
        this.toasterService.showMessage(error);
        this.loading = false;
      }
    );
  }
}
