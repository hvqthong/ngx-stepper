import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MatRippleModule,
  MatButtonModule,
  MatIconModule
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
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    NgxStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
