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

@Component({
  selector: 'psh-edit-buyer-form',
  templateUrl: './edit-buyer-form.component.html',
  styleUrls: ['./edit-buyer-form.component.scss']
})
export class EditBuyerFormComponent
  implements OnInit, OnChanges, OnDestroy, DoCheck {
  @Input() currentSellObject: any;
  @Output() cancel = new EventEmitter<any>();
  @Output() submit = new EventEmitter<FormGroup>();
  subscription: Subscription;
  editForm: FormGroup;
  buyers: any;
  constructor(private fb: FormBuilder, private agentService: AgentService) {}

  ngOnInit() {
    this.subscription = this.agentService
      .select<IPartner[]>('buyers')
      .subscribe(data => {
        if (data) {
          this.buyers = data.map(item => {
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
        buyer: ['', Validators.required],
        ddBuyer: ['', Validators.required],
        firstName: ['', [Validators.required]],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        notificationType: ['']
      });
      this.editForm.get('ddBuyer').disable();
      this.editForm.get('buyer').valueChanges.subscribe(value => {
        if (value === 'no buyer' || value === 'new buyer') {
          this.editForm.get('ddBuyer').disable();
        } else {
          this.editForm.get('ddBuyer').enable();
        }
      });
    }
  }

  ngDoCheck() {

  }
  saveBuyerInfo() {
    const buyer = this.editForm.value.buyer;
    if (buyer === 'fromList') {
      this.editForm.value.buyer = this.editForm.value.ddBuyer;
    }
    this.submit.emit(this.editForm);
  }

  onCancel() {
    this.cancel.emit();
    this.currentSellObject = null;
    this.editForm = null;
  }
}
