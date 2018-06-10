import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentService } from '../agent.service';
import { Subscription } from 'rxjs/Subscription';
import { IAgent } from '../../../core/models/agent.model';
import { Show } from '../../../core/models/show.model';
import { FormGroup } from '@angular/forms';
import { IListingObject } from '../../../core/models/listing-object';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'psh-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, OnDestroy {
  loading = true;
  agentId: string | number;
  sellObjectsList: IListingObject[] = [];
  buyersList: Show[];
  subscription: Subscription;
  currentSellObject: IListingObject;
  showModal = false;

  constructor(
    private agentService: AgentService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.subscription = this.agentService
      .select<IAgent>('agentData')
      .subscribe(data => {
        if (data) {
          this.agentId = data.id;
          this.getAgentListing({ id: this.agentId });
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAgentListing(params?) {
    this.agentService.getAgentListing(params).subscribe(response => {
      this.sellObjectsList = response;
      this.loading = false;
    }, error => (this.loading = false));
  }

  onSellerSelect(event: IListingObject) {
    const { mlsId, mlsListingId } = event;
  }

  sellerEditor(event: IListingObject) {
    this.currentSellObject = event;
    this.showModal = true;
  }

  saveSellerInfo(event: FormGroup) {
    this.agentService.saveSeller(event.value).subscribe(
      _ => {
        this.showModal = false;
        this.toaster.showMessage();
        this.getAgentListing({ id: this.agentId });
      },
      error => {
        this.toaster.showMessage(error);
      }
    );
  }

  cancel() {
    this.showModal = false;
    this.currentSellObject = null;
  }
}
