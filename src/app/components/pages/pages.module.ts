import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './admin/create-page/create-page.component';
import { MoleculesModule } from '@app/components/molecules/molecules.module';
import { TemplatesModule } from '@app/components/templates/templates.module';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { OrganismsModule } from '@app/components/organisms/organisms.module';
import { SharedModule } from '@app/shared/shared.module';
import { AtomsModule } from '../atoms/atoms.module';
import { ServiceModule } from '@app/shared/services/service.module';

@NgModule({
  declarations: [
    DashboardPageComponent,
    CreatePageComponent,
    AuthPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    TemplatesModule,
    ServiceModule,
  ],
  exports: [DashboardPageComponent, CreatePageComponent, AuthPageComponent],
})
export class PagesModule {}
