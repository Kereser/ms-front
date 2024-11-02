import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent implements OnInit, OnChanges {
  @Input() optionList!: Array<string>;
  @Input() selectedOption!: string;
  @Input() tableSize!: number;
  @Input() isWideDropdown: boolean | null = null;
  dropdownOpen = false;

  @Output() optionSelected = new EventEmitter<string>();

  ngOnInit(): void {
    this.restoreDropdwon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableSize']) {
      if (parseInt(this.selectedOption) != this.tableSize) {
        this.restoreDropdwon();
      }
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string, event: Event) {
    this.selectedOption = option;
    this.dropdownOpen = false;
    this.optionSelected.emit(option);
    event.stopPropagation();
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
