import { IAgent } from './../../../../core/models/agent.model';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  DoCheck
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPartner } from '../../../../core/models/partner.model';
import { AgentService } from '../../agent.service';
import { IListingObject } from '../../../../core/models/listing-object';

@Component({
  selector: 'psh-edit-seller-form',
  templateUrl: './edit-seller-form.component.html',
  styleUrls: ['./edit-seller-form.component.scss']
})
export class EditSellerFormComponent
  implements OnInit, OnChanges, OnDestroy, DoCheck {
  @Input() currentSellObject: IListingObject;
  @Output() cancel = new EventEmitter<any>();
  @Output() submit = new EventEmitter<FormGroup>();
  @ViewChild('ddSellers') ddSellers: ElementRef;
  subscriptionSellers: Subscription;
  subscriptionToAgent: Subscription;
  form: FormGroup;
  agent: IAgent;
  sellers: IPartner[];
  selectedSeller: IPartner;
  ddSellerValue: any[];
  constructor(private fb: FormBuilder, private agentService: AgentService) {}

  ngOnInit() {
    this.subscriptionSellers = this.agentService
      .select<IPartner[]>('sellers')
      .subscribe(data => {
        if (data) {
          this.sellers = data;
          this.ddSellerValue = this.sellers.map(item => {
            return {
              label: `${item.firstName} ${item.lastName}`,
              value: item.id
            };
          });
        }
      });

      this.subscriptionToAgent = this.agentService
      .select<IAgent>('agentData').subscribe(data => {
        if (data) {
         this.agent = data;
        }
      });
  }
  ngOnDestroy() {
    this.subscriptionSellers.unsubscribe();
    this.subscriptionToAgent.unsubscribe();
  }
  ngOnChanges() {
    if (this.currentSellObject) {
      this.form = this.fb.group({
        seller: [this.currentSellObject.sellerClient ? 'seller' : 'no seller', Validators.required],
        ddSeller: ['', Validators.required],
        client: this.fb.group({
          firstName: ['', [Validators.required]],
          lastName: ['', Validators.required],
          phone: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          notificationType: ['']
        })
      });
      this.form.get('client').disable();
      this.form.get('ddSeller').disable();
      this.form.get('seller').valueChanges.subscribe(value => {
        if (value === 'fromList') {
          this.form.get('ddSeller').enable();
          this.form.get('client').disable();
        } else if (value === 'no seller') {
          this.form.get('ddSeller').disable();
          this.form.get('ddSeller').reset();
          this.selectedSeller = null;
          this.form.get('client').disable();
          this.form.get('client').reset();
        } else {
          this.form.get('ddSeller').disable();
          this.form.get('ddSeller').reset();
          this.selectedSeller = null;
          this.form.get('client').enable();
          this.form.get('client').reset();
        }
      });
    }
  }

  ngDoCheck() {

  }
  saveSellerInfo() {
    this.form.value['agent'] = this.agent;
    this.form.value['mlsId'] = this.currentSellObject.mlsId;
    this.form.value['mlsListingId'] = this.currentSellObject.mlsListingId;
    delete this.form.value['seller'];
    delete this.form.value['ddSeller'];
    if (this.selectedSeller) {
      this.form.value.client = this.selectedSeller;
    }
    this.submit.emit(this.form);
  }

  onCancel() {
    this.cancel.emit();
    this.currentSellObject = null;
    this.form = null;
  }

  onSellerChange(value: any) {
    this.selectedSeller = this.sellers.find(item => {
      return  item.id === value;
    });
    this.form.get('client').patchValue(this.selectedSeller);
  }
}
