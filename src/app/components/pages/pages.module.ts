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
import { HomePageComponent } from './home-page/home-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    CreatePageComponent,
    AuthPageComponent,
    HomePageComponent,
    CartPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    TemplatesModule,
  ],
  exports: [
    DashboardPageComponent,
    CreatePageComponent,
    AuthPageComponent,
    HomePageComponent,
    CartPageComponent,
  ],
})
export class PagesModule {}
