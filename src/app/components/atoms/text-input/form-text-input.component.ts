import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.scss']
})
export class FormTextInputComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() config: any;
  @Input() disabled: boolean = true; 
}
