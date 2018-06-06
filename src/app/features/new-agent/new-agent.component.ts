import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from '../../core/services/data-storage.service';
import { HttpClient } from '@angular/common/http';
import { IAgent } from '../../core/models/agent.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'psh-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.css']
})
export class NewAgentComponent implements OnInit {
  form: FormGroup;
  agent: IAgent;

  constructor(
    private route: ActivatedRoute,
    private dataStorage: DataStorageService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.agent = this.route.snapshot.data.agentData;

    this.form = this.fb.group({
      mlsId: [this.agent.mlsId || '', [Validators.required]],
      firstName: [this.agent.firstName || '', [Validators.required]],
      lastName: [this.agent.lastName || '', Validators.required],
      phone: [+this.agent.phone || '', Validators.required],
      email: [this.agent.email || '', [Validators.required, Validators.email]],
      username: [this.agent.username, Validators.required],
      password: ['', Validators.required]
    });
  }

  onCreateAgent() {
    const body = { ...this.form.value, ...{ type: 'AGENT' } };

    this.http
      .post('http://stagingmob.primeshowing.com/user/registration', body)
      .subscribe(
        res => this.router.navigate(['/']),
        error => {
          console.log(error);
        }
      );
  }
}
