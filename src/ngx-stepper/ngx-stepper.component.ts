import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  StepperOptions
} from './ngx-stepper.model';

import {
  NgxStepComponent
} from './ngx-step.component';

import {
  NgxStepperService
} from './ngx-stepper.service';

@Component({
  selector: 'ngx-stepper',
  template: `
    <div class="mat-steppers flex" [ngClass]="{'mat-steppers-linear': options.linear,
                                              'mat-steppers-alternative': options.alternative,
                                              'mat-steppers-vertical': options.vertical,
                                              'mat-steppers-mobile-step-text': options.mobileStepText,
                                              'mat-steppers-has-feedback': hasFeedback}">
      <div class="mat-steppers-header-region">
        <div class="mat-steppers-header mat-steppers-horizontal mat-whiteframe-1dp">
          <button class="mat-stepper-indicator"
                  *ngFor="let step of steps; let stepNumber = index"
                  [ngClass]="{'mat-active': stepNumber === currentStep,
                              'mat-completed': isCompleted(stepNumber),
                              'mat-error': step.hasError,
                              'mat-stepper-optional': step.optional || step.hasError}"
                  (click)="goto(stepNumber)"
                  [disabled]="options.linear || stepNumber === currentStep">
            <div class="mat-stepper-indicator-wrapper">
              <div class="mat-stepper-number"
                   [ngClass]="{'mat-stepper-done': isCompleted(stepNumber)}"
                   *ngIf="!step.hasError">
                <span *ngIf="!isCompleted(stepNumber)">{{ stepNumber + 1 }}</span>
                <mat-icon class="mat-stepper-icon svg-icon" svgIcon="step-done"
                         *ngIf="isCompleted(stepNumber) && options.enableSvgIcon"></mat-icon>
                <mat-icon class="mat-stepper-icon"
                         *ngIf="isCompleted(stepNumber) && !options.enableSvgIcon">done
                </mat-icon>
              </div>
              <div class="mat-stepper-error-indicator" *ngIf="step.hasError">
                <mat-icon *ngIf="options.enableSvgIcon" svgIcon="step-warning"></mat-icon>
                <mat-icon *ngIf="!options.enableSvgIcon">warning</mat-icon>
              </div>
              <div class="mat-stepper-title">
                <span>{{ step.label }}</span>
                <small *ngIf="step.optional && !step.hasError">{{ step.optional }}</small>
                <small class="mat-stepper-error-message" *ngIf="step.hasError">
                  {{ step.message }}
                </small>
              </div>
            </div>
          </button>
        </div>
        <div class="mat-steppers-mobile-header">
          <mat-toolbar class="mat-whiteframe-1dp block"
                      style="background: #f6f6f6 !important; color: #202020 !important;">
            <div class="mat-toolbar-tools">
              <h3>
                <span>{{options.labelStep || 'Step'}} {{currentStep + 1}} {{options.labelOf || 'of'}} {{steps.length}}</span>
              </h3>
            </div>
          </mat-toolbar>
        </div>
        <div class="mat-stepper-feedback-message" *ngIf="hasFeedback">
          {{feedbackMessage}}
        </div>
      </div>
      <div class="mat-steppers-content">
        <ng-content select="ngx-step"></ng-content>
      </div>
      <div class="mat-steppers-overlay"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ngx-stepper.style.scss'],
  exportAs: 'stepper',
  providers: [NgxStepperService]
})
export class NgxStepperComponent implements OnInit {
  @Input()
  public options: StepperOptions = {
    mobileStepText: true,
    linear: true,
    vertical: false,
    alternative: true,
    labelStep: 'Step',
    labelOf: 'of',
    enableSvgIcon: false
  };

  public steps: NgxStepComponent[] = [];
  public currentStep = 0;

  public hasFeedback: boolean;
  public feedbackMessage: string;

  constructor(private _ngxStepperService: NgxStepperService) {
    this._ngxStepperService.isInitStepCmp.subscribe((step: NgxStepComponent) => {
      step.stepNumber = this.addStep(step);
      if (!step.stepper) {
        step.stepper = this;
      }
    });
  }

  public ngOnInit(): void {
    if (this.options.mobileStepText === undefined) {
      this.options.mobileStepText = true;
    }
    if (this.options.linear === undefined) {
      this.options.linear = true;
    }
    if (this.options.alternative === undefined) {
      this.options.alternative = true;
    }
    this._ngxStepperService.isInitStepperCmp.next(this);
  }

  /**
   * Register component step to this stepper.
   *
   * @param {StepCtrl} step The step to add.
   * @returns number - The step number.
   */
  public addStep(step: NgxStepComponent) {
    return this.steps.push(step) - 1;
  }

  /**
   * Complete the current step and move one to the next.
   * Using this method on editable steps (in linear stepper)
   * it will search by the next step without "completed" state to move.
   * When invoked it dispatch the event onstepcomplete to the step element.
   *
   * @returns boolean - True if move and false if not move (e.g. On the last step)
   */
  public next() {
    if (this.currentStep < this.steps.length) {
      this.clearError();
      this.currentStep++;
      this.clearFeedback();
      return true;
    }
    return false;
  }

  /**
   * Move to the previous step without change the state of current step.
   * Using this method in linear stepper it will check if previous step is editable to move.
   *
   * @returns boolean - True if move and false if not move (e.g. On the first step)
   */
  public back() {
    if (this.currentStep > 0) {
      this.clearError();
      this.currentStep--;
      this.clearFeedback();
      return true;
    }
    return false;
  }

  /**
   * Move to the next step without change the state of current step.
   * This method works only in optional steps.
   *
   * @returns boolean - True if move and false if not move (e.g. On non-optional step)
   */
  public skip() {
    let step = this.steps[this.currentStep];
    if (!step) {
      return;
    }
    if (step.optional) {
      this.currentStep++;
      this.clearFeedback();
      return true;
    }
    return false;
  }


  /**
   * Defines the current step state to "error" and shows the message parameter on
   * title message element.When invoked it dispatch the event onsteperror to the step element.
   *
   * @param {string} message The error message
   */
  public error(message: string) {
    let step = this.steps[this.currentStep];
    if (!step) {
      return;
    }
    step.hasError = true;
    step.message = message;
    this.clearFeedback();
  }

  /**
   * Defines the current step state to "normal" and removes the message parameter on
   * title message element.
   */
  public clearError() {
    let step = this.steps[this.currentStep];
    if (!step) {
      return;
    }
    step.hasError = false;
  }

  /**
   * Move "active" to specified step id parameter.
   * The id used as reference is the integer number shown on the label of each step (e.g. 2).
   *
   * @param {number} stepNumber (description)
   * @returns boolean - True if move and false if not move (e.g. On id not found)
   */
  public goto(stepNumber: number) {
    if (stepNumber < this.steps.length) {
      this.currentStep = stepNumber;
      this.clearFeedback();
      return true;
    }
    return false;
  }

  /**
   * Shows a feedback message and a loading indicador.
   *
   * @param {string} [message] The feedbackMessage
   */
  public showFeedback(message?: string) {
    this.hasFeedback = true;
    this.feedbackMessage = message;
  }

  /**
   * Removes the feedback.
   */
  public clearFeedback() {
    this.hasFeedback = false;
  }

  public isCompleted(stepNumber: number) {
    return this.options.linear && stepNumber < this.currentStep;
  };

  public isActiveStep(step: NgxStepComponent): boolean {
    return this.steps.indexOf(step) === this.currentStep;
  }
}
