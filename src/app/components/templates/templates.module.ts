import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { OrganismsModule } from '@app/components/organisms/organisms.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AtomsModule } from '@app/components/atoms/atoms.module';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent],
  imports: [CommonModule, AtomsModule, OrganismsModule],
  exports: [MainLayoutComponent, AuthLayoutComponent],
})
export class TemplatesModule {}
