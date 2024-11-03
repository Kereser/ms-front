import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { OrganismsModule } from '@app/components/organisms/organisms.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AtomsModule } from '@app/components/atoms/atoms.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent, HomeLayoutComponent],
  imports: [CommonModule, AtomsModule, OrganismsModule],
  exports: [MainLayoutComponent, AuthLayoutComponent, HomeLayoutComponent],
})
export class TemplatesModule {}
