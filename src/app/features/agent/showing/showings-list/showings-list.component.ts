import { Component, OnInit, Input } from '@angular/core';
import { SellObject } from '../../../../core/models/sell-object.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'psh-showings-list',
  templateUrl: './showings-list.component.html',
  styleUrls: ['./showings-list.component.scss']
})
export class ShowingsListComponent implements OnInit {
 @Input() data: any;

 currentSellObject: any;
 showModal = false;
  constructor() { }

  ngOnInit() {
  }

  buyerEditor(event: any) {
    this.currentSellObject = event;
    this.showModal = true;
  }

  cancelShow(item) {

  }

  saveBuyerInfo(event: FormGroup) {
    console.log(event.value);
  }

  cancel() {
    this.showModal = false;
    this.currentSellObject = null;
  }
}
