import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [CommonModule, AtomsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent],
})
export class MoleculesModule {}
