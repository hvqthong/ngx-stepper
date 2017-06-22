import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ngx-step-actions',
  template: `
    <div class="md-step-actions">
      <ng-content></ng-content>
    </div>
  `
})
export class NgxStepActionsComponent {

}
