import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '@app/components/atoms/atoms/atoms.module';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class MoleculesModule { }
