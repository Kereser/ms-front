import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

enum OnChangesValues {
  IS_VISIBLE = 'isVisible',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  isVisible = false;

  getVisible() {
    return this.isVisible;
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }
}
