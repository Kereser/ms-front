import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent implements OnInit {
  @Input() optionList!: Array<string>;
  @Input() selectedOption!: string;
  @Input() tableSize: number | null = null;
  @Input() isWideDropdown: boolean | null = null;
  dropdownOpen = false;

  @Output() optionSelected = new EventEmitter<string>();

  ngOnInit(): void {
    this.restoreDropdwon();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.dropdownOpen = false;
    this.optionSelected.emit(option);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }

  private restoreDropdwon() {
    this.selectedOption = this.optionList[0];
    this.optionSelected.emit(this.selectedOption);
  }
}
