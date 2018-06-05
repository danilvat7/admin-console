import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NewAgentComponent} from './new-agent.component';
import { ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{path: '', component: NewAgentComponent}];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewAgentComponent]
})
export class NewAgentModule { }
