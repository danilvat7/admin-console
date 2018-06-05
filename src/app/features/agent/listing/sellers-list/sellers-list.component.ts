import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IListingObject } from '../../../../core/models/listing-object';

@Component({
  selector: 'psh-sellers-list',
  templateUrl: './sellers-list.component.html',
  styleUrls: ['./sellers-list.component.scss']
})
export class SellersListComponent {
  @Input() data: IListingObject[];
  @Output() sellerSelect = new EventEmitter<IListingObject>();
  @Output() sellerEditor = new EventEmitter<IListingObject>();
  sellers: any[];
  selectedSeller: IListingObject;

  constructor() {}

  selectSeller(event) {
    this.sellerSelect.emit(event.data);
  }
  editSeller(value) {
    this.sellerEditor.emit(value);
  }
}
