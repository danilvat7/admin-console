import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IListingObject } from '../../../../core/models/listing-object';

@Component({
  selector: 'app-full-listing',
  templateUrl: './full-listing.component.html',
  styleUrls: ['./full-listing.component.scss']
})
export class FullListingComponent implements OnInit {
  @Input() listig: IListingObject[];
  @Output() selectSeller = new EventEmitter<IListingObject>();
  selectedSeller: IListingObject;

  constructor() { }

  ngOnInit() {
  }

  onSelectSeller() {
    this.selectSeller.emit(this.selectedSeller);
  }
}
