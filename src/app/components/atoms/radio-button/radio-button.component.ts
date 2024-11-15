import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  selectedOption: string | null = null;
  @Input() dataArray: Set<string> | null = null;
  @Input() title: string | null = null;

  @Output() selected = new EventEmitter<string>();

  onCheckboxChange(optionValue: string) {
    this.selectedOption = optionValue;
    this.selected.emit(optionValue);
  }

  resetData() {
    this.selectedOption = null;
  }
}
