import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '@app/utils/Constants';

@Component({
  selector: 'app-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.scss'],
})
export class FormTextInputComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() config!: FormField;
  @Input() disabled: boolean = true;
  @Input() type: string = 'text';
}
