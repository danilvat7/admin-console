import { IListingObject } from './../../../core/models/listing-object';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Inject
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AgentService } from '../agent.service';

@Component({
  selector: 'psh-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulingComponent implements OnInit, OnInit {
  listig: IListingObject[];
  filteredList: IListingObject[];
  subscription: Subscription;

  searchType = [
    {label: 'MLS ID', value: 'mlsListingId'},
    {label: 'Full address', value: 'address'}
  ];
  selectedSearchType: string;
  queryString: string;

  constructor(private agentService: AgentService) {

 }

  ngOnInit() {
    this.subscription = this.agentService
      .select<IListingObject[]>('fullListing')
      .subscribe(data => {
        if (data) {
          this.listig = data;
        }
      });
  }

  filter() {
    if (this.queryString !== '') {
        this.filteredList = this.listig.filter(function(item) {
            return item[this.selectedSearchType].toLowerCase().indexOf(this.queryString.toLowerCase()) > -1;
        }.bind(this));
    } else {
        this.filteredList = [];
    }
  }
}
