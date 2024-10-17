import { Component, Input } from '@angular/core';
import { Consts } from '../../../utils/Constants';

@Component({
  selector: 'app-naked-button',
  templateUrl: './naked-button.component.html',
  styleUrls: ['./naked-button.component.scss']
})
export class NakedButtonComponent {
  @Input() content: number | string = Consts.DEFAULT_BUTTON;
  @Input() disabled: boolean = false;
}
