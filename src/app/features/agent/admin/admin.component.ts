import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAgent } from '../../../core/models/agent.model';
import { Subscription } from 'rxjs/Subscription';
import { AgentService } from '../agent.service';
import { ConfirmationService } from 'primeng/api';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'psh-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  agentData: IAgent;
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private agentService: AgentService,
    private confirmationService: ConfirmationService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.subscription = this.agentService
      .select<IAgent>('agentData')
      .subscribe(data => {
        if (data) {
          this.agentData = data;
          this.buildForm();
        }
      });
  }
  buildForm() {
    this.form = this.fb.group({
      firstName: [this.agentData.firstName || '', [Validators.required]],
      lastName: [this.agentData.lastName || '', Validators.required],
      phone: [+this.agentData.phone || '', Validators.required],
      email: [
        this.agentData.email || '',
        [Validators.required, Validators.email]
      ],
      username: [this.agentData.username || ''],
      notificationType: [
        this.agentData.notificationType || '',
        Validators.required
      ]
    });
  }

  confirmDeleting() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this agent?',
      header: 'Delete Confirmation',
      accept: () => {
        console.log('Delete agent!');
      }
    });
  }
  forgotPassword() {
    const data = {
      email: this.agentData.email,
      mlsId: this.agentData.mlsId,
      type: 'AGENT'
    };

    this.agentService.forgotpassword(data, {}, 'mobile').subscribe(_ => {
      this.toasterService.showMessage();
    }, error => {
      this.toasterService.showMessage(error);
    });
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
