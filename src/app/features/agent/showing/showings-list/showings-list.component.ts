import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'psh-showings-list',
  templateUrl: './showings-list.component.html',
  styleUrls: ['./showings-list.component.scss']
})
export class ShowingsListComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Output() cancelShowing = new EventEmitter<any>();
  @ViewChild('addressIn') addressIn: ElementRef;
  @ViewChild('nameIn') nameIn: ElementRef;
  filteredList = [];
  currentSellObject: any;
  showModal = false;
  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.data) {
      this.filteredList = this.data;
    }
  }
  buyerEditor(event: any) {
    this.currentSellObject = event;
    this.showModal = true;
  }

  onCancelShow(item) {
    this.confirmationService.confirm({
      message: 'Do you want to cancel this showing?',
      header: 'Cancel Confirmation',
      accept: () => {
        this.cancelShowing.emit(item);
      }
    });
  }

  saveBuyerInfo(event: FormGroup) {}

  filterCol() {
    const address = this.addressIn.nativeElement.value ;
    const buyerName = this.nameIn.nativeElement.value;
      this.filteredList = this.data.filter(item => {
        return (
          item['address']
            .toLowerCase()
            .indexOf(address.toLowerCase()) > -1 &&
          item['buyerName']
            .toLowerCase()
            .indexOf(buyerName.toLowerCase()) > -1
        );
      });

  }
  cancel() {
    this.showModal = false;
    this.currentSellObject = null;
  }
}
