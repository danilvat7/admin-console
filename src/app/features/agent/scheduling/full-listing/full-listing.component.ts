import { Component, OnInit, Input } from '@angular/core';
import { IListingObject } from '../../../../core/models/listing-object';

@Component({
  selector: 'app-full-listing',
  templateUrl: './full-listing.component.html',
  styleUrls: ['./full-listing.component.scss']
})
export class FullListingComponent implements OnInit {
  @Input() listig: IListingObject[];

  selectedSeller: IListingObject;

  constructor() { }

  ngOnInit() {
  }
  click(item: IListingObject)  {
    this.selectedSeller = item;
  }
}
