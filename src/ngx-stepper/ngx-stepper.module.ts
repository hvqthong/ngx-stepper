import {
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MdInputModule,
  MdRippleModule,
  MdButtonModule,
  MdIconModule,
  MdDialogModule,
  MdToolbarModule
} from '@angular/material';

import {
  NgxStepperComponent
} from './ngx-stepper.component';

import {
  NgxStepComponent
} from './ngx-step.component';

import {
  NgxStepBodyComponent
} from './ngx-step-body.component';

import {
  NgxStepActionsComponent
} from './ngx-step-actions.component';

import {
  NgxStepperService
} from './ngx-stepper.service';

@NgModule({
  declarations: [
    NgxStepperComponent,
    NgxStepComponent,
    NgxStepBodyComponent,
    NgxStepActionsComponent
  ],
  imports: [
    CommonModule,
    MdInputModule,
    MdRippleModule,
    MdButtonModule,
    MdIconModule,
    MdDialogModule,
    MdToolbarModule
  ],
  exports: [
    NgxStepperComponent,
    NgxStepComponent,
    NgxStepBodyComponent,
    NgxStepActionsComponent
  ],
  providers: [ NgxStepperService ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class NgxStepperModule {
}
