import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@app/components/organisms/table/table.component';
import { MoleculesModule } from '@app/components/molecules/molecules.module';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from '@app/shared/shared.module';
import { CreatePageRoutingModule } from '@app/router/create-page/create-page-routing.module';
import { HeaderWithOptionsComponent } from './header-with-options/header-with-options.component';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    TableComponent,
    HeaderWithOptionsComponent,
  ],
  imports: [
    CreatePageRoutingModule,
    SharedModule,
    CommonModule,
    AtomsModule,
    MoleculesModule,
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    TableComponent,
    HeaderWithOptionsComponent,
  ],
})
export class OrganismsModule {}
