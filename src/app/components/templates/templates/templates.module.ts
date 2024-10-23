import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { AtomsModule } from '@app/components/atoms/atoms/atoms.module';
import { OrganismsModule } from '@app/components/organisms/organisms/organisms.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, AtomsModule, OrganismsModule],
  exports: [MainLayoutComponent],
})
export class TemplatesModule {}
