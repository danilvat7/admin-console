import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';

import { SelectMlsComponent } from './components/select-mls/select-mls.component';
@NgModule({
  declarations: [SelectMlsComponent],
  imports: [FormsModule, DropdownModule],
  exports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    SplitButtonModule,
    SelectMlsComponent,
    InputTextModule,
    CheckboxModule,
    DialogModule,
    RadioButtonModule
  ]
})
export class SharedModule {}
