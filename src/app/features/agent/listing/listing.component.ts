import { Component, OnInit, OnDestroy } from '@angular/core';
import { SellObject } from '../../../core/models/sell-object.model';
import { AgentService } from '../agent.service';
import { Subscription } from 'rxjs/Subscription';
import { IAgent } from '../../../core/models/agent.model';
import { Show } from '../../../core/models/show.model';
import { Partner } from '../../../core/models/partner.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'psh-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit, OnDestroy {
  agentId: string | number;
  sellObjectsList: SellObject[] = [];
  buyersList: Show[];
  subscription: Subscription;
  currentSellObject: SellObject;
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
          this.agentService
            .getAgentListing({ id: this.agentId })
            .subscribe(response => {
              this.sellObjectsList = response;
            });
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getBuyersList(mlsId, mlsListingId) {
    this.agentService
      .getShowingsBySellObj({ mlsId, mlsListingId })
      .subscribe(response => {
        const { future = [], today = [], past = [] } = response;
        this.buyersList = [...future, ...today, ...past];
      });
  }

  onSellerSelect(event: SellObject) {
    const { mlsId, mlsListingId } = event;
    this.getBuyersList(mlsId, mlsListingId);
  }

  sellerEditor(event: SellObject) {
    this.currentSellObject = event;
    this.showModal = true;
  }

  saveSellerInfo(event: FormGroup) {
    console.log(event.value);
  }

  cancel() {
    this.showModal = false;
    this.currentSellObject = null;
  }
}
