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
    <div class="mat-step" [ngClass]="{ 'mat-active': isActive() }">
      <div class="mat-stepper" [ngClass]="{ 'mat-active': isActive() }">
        <div class="mat-steppers-header mat-steppers-vertical">
          <button class="mat-stepper-indicator"
                  [ngClass]="{'mat-active': stepNumber === stepper.currentStep,
                              'mat-completed': stepper.isCompleted(stepNumber),
                              'mat-error': hasError,
                              'mat-stepper-optional': optional || hasError}"
                  (click)="stepper.goto(stepNumber)"
                  [disabled]="stepper.options.linear || stepNumber === stepper.currentStep">
            <div class="mat-stepper-indicator-wrapper">
              <div class="mat-stepper-number" *ngIf="!hasError"
                   [ngClass]="{'mat-stepper-done': stepper.isCompleted(stepNumber)}">
                <span *ngIf="!stepper.isCompleted(stepNumber)">{{ stepNumber + 1 }}</span>
                <mat-icon class="mat-stepper-icon svg-icon" svgIcon="step-done"
                         *ngIf="stepper.isCompleted(stepNumber) && stepper.options.enableSvgIcon"></mat-icon>
                <mat-icon class="mat-stepper-icon"
                         *ngIf="stepper.isCompleted(stepNumber) && !stepper.options.enableSvgIcon">done</mat-icon>
              </div>
              <div class="mat-stepper-error-indicator" *ngIf="hasError">
                <mat-icon *ngIf="stepper.options.enableSvgIcon" svgIcon="step-warning"></mat-icon>
                <mat-icon *ngIf="!stepper.options.enableSvgIcon">warning</mat-icon>
              </div>

              <div class="mat-stepper-title">
                <span>{{ label }}</span>
                <small *ngIf="optional && !hasError">{{ optional }}</small>
                <small class="mat-stepper-error-message" *ngIf="hasError">
                  {{ message }}
                </small>
              </div>
            </div>
          </button>
          <div [hidden]="!stepper.hasFeedback"></div>
          <!--<div class="mat-stepper-feedback-message" [hidden]="!stepper.hasFeedback">-->
          <!--{{stepper.feedbackMessage}}-->
          <!--</div>-->
        </div>
        <div class="mat-steppers-scope" [hidden]="!isActive()">
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
