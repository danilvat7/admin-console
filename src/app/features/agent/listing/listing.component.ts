import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentService } from '../agent.service';
import { Subscription } from 'rxjs/Subscription';
import { IAgent } from '../../../core/models/agent.model';
import { Show } from '../../../core/models/show.model';
import { FormGroup } from '@angular/forms';
import { IListingObject } from '../../../core/models/listing-object';

@Component({
  selector: 'psh-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, OnDestroy {
  agentId: string | number;
  sellObjectsList: IListingObject[] = [];
  buyersList: Show[];
  subscription: Subscription;
  currentSellObject: IListingObject;
  showModal = false;

  constructor(
    private agentService: AgentService,
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
    this.agentService
    .getAgentListing(params)
    .subscribe(response => {
      this.sellObjectsList = response;
    });
  }
  getBuyersList(mlsId, mlsListingId) {
    this.agentService
      .getShowingsBySellObj({ mlsId, mlsListingId })
      .subscribe(response => {
        const { future = [], today = [], past = [] } = response;
        this.buyersList = [...future, ...today, ...past];
      });
  }

  onSellerSelect(event: IListingObject) {
    const { mlsId, mlsListingId } = event;
    this.getBuyersList(mlsId, mlsListingId);
  }

  sellerEditor(event: IListingObject) {
    this.currentSellObject = event;
    this.showModal = true;
  }

  saveSellerInfo(event: FormGroup) {
    this.agentService.saveSeller(event.value).subscribe(response => {
      this.showModal = false;
      this.getAgentListing({ id: this.agentId });
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.showModal = false;
    this.currentSellObject = null;
  }
}
