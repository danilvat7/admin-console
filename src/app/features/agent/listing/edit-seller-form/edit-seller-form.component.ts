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
import { SellObject } from '../../../../core/models/sell-object.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Partner } from '../../../../core/models/partner.model';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'psh-edit-seller-form',
  templateUrl: './edit-seller-form.component.html',
  styleUrls: ['./edit-seller-form.component.scss']
})
export class EditSellerFormComponent
  implements OnInit, OnChanges, OnDestroy, DoCheck {
  @Input() currentSellObject: SellObject;
  @Output() cancel = new EventEmitter<any>();
  @Output() submit = new EventEmitter<FormGroup>();
  @ViewChild('ddSellers') ddSellers: ElementRef;
  subscription: Subscription;
  editForm: FormGroup;
  selectedSeller: any;
  sellers: any;
  constructor(private fb: FormBuilder, private agentService: AgentService) {}

  ngOnInit() {
    this.subscription = this.agentService
      .select<Partner[]>('sellers')
      .subscribe(data => {
        if (data) {
          this.sellers = data.map(item => {
            return {
              label: `${item['firstName']} ${item['lastName']}`,
              value: `${item['firstName']} ${item['lastName']}`
            };
          });
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnChanges() {
    if (this.currentSellObject) {
      this.editForm = this.fb.group({
        seller: ['', Validators.required],
        ddSeller: ['', Validators.required],
        firstName: ['', [Validators.required]],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        notificationType: ['']
      });
      this.editForm.get('ddSeller').disable();
      this.editForm.get('seller').valueChanges.subscribe(value => {
        if (value === 'no seller' || value === 'new seller') {
          this.editForm.get('ddSeller').disable();
        } else {
          this.editForm.get('ddSeller').enable();
        }
      });
    }
  }

  ngDoCheck() {

  }
  saveSellerInfo() {
    const seller = this.editForm.value.seller;
    if (seller === 'fromList') {
      this.editForm.value.seller = this.editForm.value.ddSeller;
    }
    this.submit.emit(this.editForm);
  }

  onCancel() {
    this.cancel.emit();
    this.currentSellObject = null;
    this.editForm = null;
  }

  onSellerChange(value: any) {
    console.log(value);
  }
}
