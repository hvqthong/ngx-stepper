import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ngx-step-body',
  template: `
    <div class="mat-step-body">
      <ng-content></ng-content>
    </div>
  `
})
export class NgxStepBodyComponent {

}
