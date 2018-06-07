import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IListingObject } from '../../../../core/models/listing-object';
import { Show } from '../../../../core/models/show.model';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'psh-sellers-list',
  templateUrl: './sellers-list.component.html',
  styleUrls: ['./sellers-list.component.scss']
})
export class SellersListComponent {
  loading = false;
  @Input() data: IListingObject[];
  @Output() sellerSelect = new EventEmitter<IListingObject>();
  @Output() sellerEditor = new EventEmitter<IListingObject>();
  sellers: any[];
  buyersList: Show[];
  selectedSeller: IListingObject;
  buyersData = {};
  constructor(private agentService: AgentService) {}

  editSeller(e, value) {
   
    this.sellerEditor.emit(value);
    e.stopPropagation();
  }

  getBuyersList(mlsId, mlsListingId) {
    this.agentService
      .getShowingsBySellObj({ mlsId, mlsListingId })
      .subscribe(response => {
        const { future = [], today = [], past = [] } = response;
        const concatData = [...future, ...today, ...past];
        this.buyersData[mlsListingId] = concatData;
        this.loading = false;
      });
  }

  selectSeller(data, expanded) {
    if (!expanded) {
      this.loading = true;
    }
    const { mlsId, mlsListingId } = data;
    if (!this.buyersData.hasOwnProperty(mlsListingId)) {
      this.getBuyersList(mlsId, mlsListingId);
    } else {
      this.loading = false;
    }
  }
}
