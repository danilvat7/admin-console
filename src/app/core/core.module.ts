import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
  ]
})
export class CoreModule {}
