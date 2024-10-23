import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from '../admin/dashboard-page/dashboard-page.component';
import { OrganismsModule } from '@app/components/organisms/organisms/organisms.module';
import { CreatePageComponent } from '../admin/create-page/create-page.component';
import { MoleculesModule } from '@app/components/molecules/molecules/molecules.module';
import { TemplatesModule } from '@app/components/templates/templates/templates.module';

@NgModule({
  declarations: [DashboardPageComponent, CreatePageComponent],
  imports: [CommonModule, MoleculesModule, OrganismsModule, TemplatesModule],
  exports: [DashboardPageComponent, CreatePageComponent],
})
export class PagesModule {}
