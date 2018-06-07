import { IListingObject } from './../../../core/models/listing-object';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Inject,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AgentService } from '../agent.service';
// import './../../../../assets/mls-app';

@Component({
  selector: 'psh-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit, AfterViewInit, OnDestroy {
  listig: IListingObject[];
  filteredList: IListingObject[];
  subscription: Subscription;

  searchType = [
    { label: 'MLS ID', value: 'mlsListingId' },
    { label: 'Full address', value: 'address' }
  ];
  selectedSearchType = 'address';
  queryString: string;

  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.subscription = this.agentService
      .select<IListingObject[]>('fullListing')
      .subscribe(data => {
        if (data) {
          this.listig = data;
        }
      });
  }
  ngAfterViewInit() {
    window['PS'].configure({
      buttonType: 'multiple_showings',
      containerId: 'listing_details_container',
      client: '3b6d76fd',
      mls: 'STAGING',
      listing: '',
      agent: '2672354649',
      host: 'http://stagingmls.primeshowing.com'
    });
  }
  ngOnDestroy() {}
  filter() {
    if (this.queryString !== '') {
      this.filteredList = this.listig.filter(
        function(item) {
          return (
            item[this.selectedSearchType]
              .toLowerCase()
              .indexOf(this.queryString.toLowerCase()) > -1
          );
        }.bind(this)
      );
    } else {
      this.filteredList = [];
    }
  }

  onSelectSeller(event: IListingObject){
    console.log(document.getElementById('primeshowinglinklisting_details_container_multiple_showings'))
    document.getElementById('primeshowinglinklisting_details_container_multiple_showings').classList.remove('disabled');
    window['PS'].model.listing_details_container.listing = [event.mlsListingId];
  }
}
