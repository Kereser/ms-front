import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {

  @Input() optionList!: Array<string>;
  @Input() selectedOption!: string;
  dropdownOpen = false;

  @Output() optionSelected = new EventEmitter<string>();

  ngOnInit(): void { 
    this.selectedOption = this.optionList[0];
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string, event: Event) {
    this.selectedOption = option;
    this.dropdownOpen = false;
    console.log(option);
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
}
