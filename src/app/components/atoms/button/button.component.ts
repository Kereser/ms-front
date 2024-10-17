import { Component, Input } from '@angular/core';
import { Consts } from '../../../utils/Constants';

@Component({
  selector: Consts.BUTTON_SELECTOR,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: string = Consts.BUTTON;
  @Input() disabled: boolean = Consts.FALSE;
  @Input() text: string = Consts.DEFAULT_BUTTON;
}