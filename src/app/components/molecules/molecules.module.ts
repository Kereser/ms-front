import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../atoms/atoms.module';
import { PaginationComponent } from './pagination/pagination.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [DynamicFormComponent, PaginationComponent, CardComponent],
  imports: [CommonModule, AtomsModule, ReactiveFormsModule],
  exports: [DynamicFormComponent, PaginationComponent, CardComponent],
})
export class MoleculesModule {}
