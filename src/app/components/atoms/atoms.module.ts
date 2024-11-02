import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { ButtonComponent } from './button/button.component';
import { NakedButtonComponent } from './naked-button/naked-button.component';
import { FormTextInputComponent } from './text-input/form-text-input.component';
import { ToastComponent } from './toast/toast.component';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    ButtonComponent,
    NakedButtonComponent,
    FormTextInputComponent,
    ToastComponent,
    CustomDropdownComponent,
    ModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [
    ButtonComponent,
    NakedButtonComponent,
    FormTextInputComponent,
    ToastComponent,
    CustomDropdownComponent,
    ModalComponent,
  ],
})
export class AtomsModule {}
