import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  DomSanitizer
} from '@angular/platform-browser';

import {
  MdIconRegistry
} from '@angular/material';

import {
  StepperOptions,
  NgxStepperComponent
} from '../ngx-stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('stepperDemo')
  public steppers: NgxStepperComponent;

  public options: StepperOptions = {
    vertical: false,
    linear: true,
    alternative: true,
    mobileStepText: true,
    enableSvgIcon: true
  };
  public campaign = false;

  constructor(private _iconRegistry: MdIconRegistry,
              private _sanitizer: DomSanitizer) {
    // empty
  }

  public ngOnInit(): void {
    this._iconRegistry
      .addSvgIcon('step-done', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icon/done.svg'));
    this._iconRegistry
      .addSvgIcon('step-warning', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icon/warning.svg'));
  }

  public selectCampaign(): void {
    this.steppers.showFeedback('Checking, please wait ...');
    setTimeout(() => {
      if (this.campaign) {
        this.steppers.clearError();
        this.steppers.next();
      } else {
        this.campaign = !this.campaign;
        this.steppers.error('Wrong campaign');
      }
    }, 3000);
  }

  public previousStep(): void {
    this.steppers.back();
  }

  public cancel(): void {
    this.steppers.back();
  }

  public nextStep(): void {
    this.steppers.next();
  }

  public toggleMobileStepText(): void {
    this.options.mobileStepText = !this.options.mobileStepText;
    this.options = Object.assign({}, this.options);
  }

  public toggleLinear(): void {
    this.options.linear = !this.options.linear;
    this.options = Object.assign({}, this.options);
  }

  public toggleAlternative(): void {
    this.options.alternative = !this.options.alternative;
    this.options = Object.assign({}, this.options);
  }

  public toggleVertical(): void {
    this.options.vertical = !this.options.vertical;
    this.options = Object.assign({}, this.options);
  }

  public showError(): void {
    this.steppers.error('Wrong campaign');
  }

  public clearError(): void {
    this.steppers.clearError();
  }

  public showFeedback(): void {
    this.steppers.showFeedback('Step 1 looks great! Step 2 is comming up.');
  }

  public clearFeedback(): void {
    this.steppers.clearFeedback();
  }
}
