import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SellObject } from '../../../../core/models/sell-object.model';

@Component({
  selector: 'psh-sellers-list',
  templateUrl: './sellers-list.component.html',
  styleUrls: ['./sellers-list.component.scss']
})
export class SellersListComponent {
  @Input() data: SellObject[];
  @Output() sellerSelect = new EventEmitter<SellObject>();
  @Output() sellerEditor = new EventEmitter<SellObject>();
  sellers: any[];
  selectedSeller: SellObject;

  constructor() {}

  selectSeller(event) {
    this.sellerSelect.emit(event.data);
  }
  editSeller(value) {
    this.sellerEditor.emit(value);
  }
}
