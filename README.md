# ngx-stepper

Angular Steppers directive for Angular Material

Based on Material Steppers: https://www.google.com/design/spec/components/steppers.html#steppers-types-of-steppers

## Plunker Demo

[http://embed.plnkr.co/n1Ye3pQY6dlMSoJizO6Y/](http://embed.plnkr.co/n1Ye3pQY6dlMSoJizO6Y/)

## Run Demo App
You can try out the Angular Steppers in the demo app built with [Angular-CLI](https://github.com/angular/angular-cli). 

### #1 To start the demo app clone or download the repo.
### #2 Install the latest version of Angular-CLI
```bash
npm install -g angular-cli@latest
```
### #3 Install npm packages
```bash
npm install
```
### #4 Run the app
```bash
ng serve
```
### #5 Open the app
[http://localhost:4200/](http://localhost:4200/)

## Installation in package.json

```bash
npm i -S ngx-stepper
```

**note**: works with angular 2 & 4

### Import to app module

```ts
import { NgxStepperModule } from 'ngx-stepper';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Write your html

```html      
<ngx-stepper #stepperDemo="stepper" [options]="options">
  <ngx-step [label]="'Select a campaign'">
    <ngx-step-body>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nobis saepe facere suscipit atque,
        sapiente, natus mollitia ipsum odit accusamus repellendus deserunt. Odio sit similique, labore maxime
        voluptatibus, eaque autem!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nobis saepe facere suscipit atque,
        sapiente, natus mollitia ipsum odit accusamus repellendus deserunt. Odio sit similique, labore maxime
        voluptatibus, eaque autem!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nobis saepe facere suscipit atque,
        sapiente, natus mollitia ipsum odit accusamus repellendus deserunt. Odio sit similique, labore maxime
        voluptatibus, eaque autem!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nobis saepe facere suscipit atque,
        sapiente, natus mollitia ipsum odit accusamus repellendus deserunt. Odio sit similique, labore maxime
        voluptatibus, eaque autem!</p>
    </ngx-step-body>
    <ngx-step-actions>
      <button md-button class="md-primary md-raised" (click)="selectCampaign()">Continue</button>
      <button md-button class="md-primary" (click)="stepper.back()">Cancel</button>
    </ngx-step-actions>
  </ngx-step>
  <ngx-step [label]="'Publish the ad'">
    <ngx-step-body>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nobis saepe facere suscipit atque,
        sapiente, natus mollitia ipsum odit accusamus repellendus deserunt. Odio sit similique, labore maxime
        voluptatibus, eaque autem!</p>
    </ngx-step-body>
    <ngx-step-actions>
      <button md-button class="md-primary md-raised" (click)="stepper.next()">Complete</button>
      <button md-button class="md-primary" (click)="stepper.back()">Back</button>
    </ngx-step-actions>
  </ngx-step>
```

# Stepper Options

**options attribute**

Value of the options attribute is a type of StepperOptions. It can contain the following properties.

Detailed property bellow:

| Options | Default | Type | Description |
| --- | --- | --- | -- |
| **vertical** | false | boolean |  |
| **linear** | true | boolean |  |
| **alternative** | true | boolean |  |
| **mobileStepText** | true | boolean |  |
| **labelStep** | 'Step' | string |  |
| **labelOf** | 'Of' | string |  |
| **enableSvgIcon** | false | boolean |  |

# Stepper Service

Used to control a stepper by it's id. Example:

```ts
@ViewChild('stepperDemo')
public steppers: NgxStepperComponent;

public selectCampaign(): void {
  this.steppers.showFeedback('Checking, please wait ...');
  this.steppers.next();
}
```

Detailed service operations bellow:

| Method | Description | Returns |
| --- | --- | --- |
| `next()` | Complete the current step and move one to the next. Using this method on editable steps (in linear stepper) it will search by the next step without "completed" state to move. When invoked it dispatch the event onstepcomplete to the step element. | boolean - True if move and false if not move (e.g. On the last step) | 
| `back()` | Move to the previous step without change the state of current step. Using this method in linear stepper it will check if previous step is editable to move. | boolean - True if move and false if not move (e.g. On the first step) |
| `skip()` | Move to the next step without change the state of current step. This method works only in optional steps. | boolean - True if move and false if not move (e.g. On non-optional step) |
| `goto(stepNumber: number)` | Move "active" to specified step id parameter. The id used as reference is the integer number shown on the label of each step (e.g. 2). | boolean - True if move and false if not move (e.g. On id not found) |
| `error(message: string)` | Defines the current step state to "error" and shows the message parameter on title message element.When invoked it dispatch the event onsteperror to the step element. | {string} message The error message |
| `clearError()` | Defines the current step state to "normal" and removes the message parameter on title message element. | void |
| `showFeedback(message?: string)` | Shows a feedback message and a loading indicador. | void |
| `clearFeedback()` | Removes the feedback. |  void |

# Embed SVG Icon assets
- Supported Namespace: 'step-done', 'step-warning'
```ts
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

public options: StepperOptions = {
  enableSvgIcon: true
};
  
constructor(private _iconRegistry: MdIconRegistry,private _sanitizer: DomSanitizer) {}

public ngOnInit(): void {
  this._iconRegistry
    .addSvgIcon('step-done', this._sanitizer.bypassSecurityTrustResourceUrl('YOUR_ICON_URL'));
  this._iconRegistry
    .addSvgIcon('step-warning', this._sanitizer.bypassSecurityTrustResourceUrl('YOUR_ICON_URL'));
}
```
- EX: 'YOUR_ICON_URL' = 'assets/icon/warning.svg'

# TODO

- [x] Horizontal steppers
- [x] Vertical steppers
- [x] Linear steppers
- [x] Non-linear steppers
- [x] Alternative labels
- [x] Optional steps
- [ ] Editable steps
- [x] Stepper feedback
- Mobile steppers
    - [x] Mobile step text
    - [ ] Mobile step dots
    - [ ] Mobile step progress bar
- [x] Correct apply styles (css) of the material design
- [x] Embed SVG Icon assets
- [ ] Create a better demo page with all options.

## Remarks

- Based on:
 - [Material Steppers](https://github.com/eberlitz/material-steppers)
 - [MDL Stepper](https://github.com/ahlechandre/mdl-stepper)
 - [MD Steppers](https://github.com/ipiz/md-steppers)
 - [Angular Material Steppers](https://github.com/marcosmoura/angular-material-steppers)

- Thanks to all ;)
