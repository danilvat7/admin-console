import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAgent } from '../../../core/models/agent.model';
import { Subscription } from 'rxjs/Subscription';
import { AgentService } from '../agent.service';

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
    private agentService: AgentService
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
      email: [this.agentData.email || '', [Validators.required, Validators.email]],
      username: [this.agentData.username || '', Validators.required],
      password: [this.agentData.password || '', Validators.required],
      confirmPassword: ['', Validators.required],
      notificationType: [this.agentData.notificationType || '', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
