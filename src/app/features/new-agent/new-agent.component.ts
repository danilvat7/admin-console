import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../../core/services/data-storage.service';
import {HttpClient} from '@angular/common/http';
import {IAgent} from '../../core/models/agent.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'psh-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.css']
})
export class NewAgentComponent implements OnInit {
  form: FormGroup;
  agent: IAgent;

  constructor(private route: ActivatedRoute,
              private dataStorage: DataStorageService,
              private fb: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      mlsId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.agent = this.route.snapshot.data.agentData;
   // this.patchForm();
  }

  // private patchForm() {
  //   const patchData = {
  //     mlsId: this.agent.mlsId,
  //     firstName: this.agent.firstName,
  //     lastName: this.agent.lastName,
  //     phone: this.agent.phone,
  //     email: this.agent.email,
  //   };

  //   this.form.patchValue(patchData);
  // }

  onCreateAgent() {
    const body = {...this.form.value, ...{type: 'AGENT'}};
    console.log(body);
    this.http.post('http://stagingmob.primeshowing.com/user/registration', body).subscribe(res => console.log(res));
  }

}
