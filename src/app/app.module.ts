import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdRippleModule,
  MdButtonModule,
  MdIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NgxStepperModule } from '../ngx-stepper';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdRippleModule,
    MdButtonModule,
    MdIconModule,
    NgxStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
