import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  NgxStepperComponent
} from './ngx-stepper.component';

import {
  NgxStepperService
} from './ngx-stepper.service';

@Component({
  selector: 'ngx-step',
  template: `
    <div class="md-step" [ngClass]="{ 'md-active': isActive() }">
      <div class="md-stepper" [ngClass]="{ 'md-active': isActive() }">
        <div class="md-steppers-header md-steppers-vertical">
          <button class="md-stepper-indicator"
                  [ngClass]="{'md-active': stepNumber === stepper.currentStep,
                              'md-completed': stepper.isCompleted(stepNumber),
                              'md-error': hasError,
                              'md-stepper-optional': optional || hasError}"
                  (click)="stepper.goto(stepNumber)"
                  [disabled]="stepper.options.linear || stepNumber === stepper.currentStep">
            <div class="md-stepper-indicator-wrapper">
              <div class="md-stepper-number" *ngIf="!hasError"
                   [ngClass]="{'md-stepper-done': stepper.isCompleted(stepNumber)}">
                <span *ngIf="!stepper.isCompleted(stepNumber)">{{ stepNumber + 1 }}</span>
                <md-icon class="md-stepper-icon svg-icon" svgIcon="step-done"
                         *ngIf="stepper.isCompleted(stepNumber) && stepper.options.enableSvgIcon"></md-icon>
                <md-icon class="md-stepper-icon"
                         *ngIf="stepper.isCompleted(stepNumber) && !stepper.options.enableSvgIcon">done</md-icon>
              </div>
              <div class="md-stepper-error-indicator" *ngIf="hasError">
                <md-icon *ngIf="stepper.options.enableSvgIcon" svgIcon="step-warning"></md-icon>
                <md-icon *ngIf="!stepper.options.enableSvgIcon">warning</md-icon>
              </div>

              <div class="md-stepper-title">
                <span>{{ label }}</span>
                <small *ngIf="optional && !hasError">{{ optional }}</small>
                <small class="md-stepper-error-message" *ngIf="hasError">
                  {{ message }}
                </small>
              </div>
            </div>
          </button>
          <div [hidden]="!stepper.hasFeedback"></div>
          <!--<div class="md-stepper-feedback-message" [hidden]="!stepper.hasFeedback">-->
          <!--{{stepper.feedbackMessage}}-->
          <!--</div>-->
        </div>
        <div class="md-steppers-scope" [hidden]="!isActive()">
          <ng-content select="ngx-step-body"></ng-content>
          <ng-content select="ngx-step-actions"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class NgxStepComponent implements OnInit {
  @Input()
  public label: string;

  @Input()
  public optional: string;

  public stepNumber: number;
  public hasError: boolean;
  public message: string;
  public stepper: NgxStepperComponent;

  constructor(private _ngxStepperService: NgxStepperService) {
    this._ngxStepperService.isInitStepperCmp.subscribe((stepper: NgxStepperComponent) => {
      this.stepper = stepper;
    });
  }

  public ngOnInit(): void {
    this._ngxStepperService.isInitStepCmp.next(this);
  }

  public isActive(): boolean {
    return this.stepper ? this.stepper.isActiveStep(this) : false;
  }
}
