import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SelectMlsComponent } from './components/select-mls/select-mls.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
@NgModule({
  declarations: [SelectMlsComponent, PreloaderComponent],
  imports: [FormsModule, DropdownModule, ProgressSpinnerModule, CommonModule],
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
    RadioButtonModule,
    ProgressSpinnerModule,
    PreloaderComponent
  ]
})
export class SharedModule {}
