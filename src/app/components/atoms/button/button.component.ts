import { Component, Input } from '@angular/core';
import { Constants } from '../../../utils/Constants';

@Component({
  selector: Constants.BUTTON_SELECTOR,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: string = Constants.BUTTON;
  @Input() disabled: boolean = Constants.TRUE;
  @Input() text: string = Constants.DEFAULT_BUTTON
}