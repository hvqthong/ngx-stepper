import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ngx-step-body',
  template: `
    <div class="md-step-body">
      <ng-content></ng-content>
    </div>
  `
})
export class NgxStepBodyComponent {

}
