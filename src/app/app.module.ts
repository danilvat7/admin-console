import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataStorageService} from './core/services/data-storage.service';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    DataStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
