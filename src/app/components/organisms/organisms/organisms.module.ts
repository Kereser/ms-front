import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@app/components/organisms/table/table.component';
import { MoleculesModule } from '@app/components/molecules/molecules/molecules.module';
import { AtomsModule } from '@app/components/atoms/atoms/atoms.module';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { SharedModule } from '@app/shared/shared/shared.module';
import { CreatePageRoutingModule } from '@app/router/create-page/create-page-routing.module';

@NgModule({
  declarations: [HeaderComponent, NavigationComponent, TableComponent],
  imports: [
    CreatePageRoutingModule,
    SharedModule,
    CommonModule,
    AtomsModule,
    MoleculesModule,
  ],
  exports: [HeaderComponent, NavigationComponent, TableComponent],
})
export class OrganismsModule {}
