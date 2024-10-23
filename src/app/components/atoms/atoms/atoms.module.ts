import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { NakedButtonComponent } from '../naked-button/naked-button.component';
import { FormTextInputComponent } from '../text-input/form-text-input.component';
import { ToastComponent } from '../toast/toast.component';
import { CustomDropdownComponent } from '../custom-dropdown/custom-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared/shared.module';

@NgModule({
  declarations: [
    ButtonComponent,
    NakedButtonComponent,
    FormTextInputComponent,
    ToastComponent,
    CustomDropdownComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [
    ButtonComponent,
    NakedButtonComponent,
    FormTextInputComponent,
    ToastComponent,
    CustomDropdownComponent,
  ],
})
export class AtomsModule {}
