import {
  Injectable
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

import {
  NgxStepComponent
} from './ngx-step.component';

import {
  NgxStepperComponent
} from './ngx-stepper.component';

@Injectable()
export class NgxStepperService {
  public isInitStepperCmp = new Subject<NgxStepperComponent>();
  public isInitStepCmp = new Subject<NgxStepComponent>();
}
