import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderComponent,
  ]
})
export class CoreModule {}
