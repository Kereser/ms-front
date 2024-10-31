import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbaordPageRoutingModule } from './dashbaord-page-routing.module';
import { PagesModule } from '@app/components/pages/pages.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashbaordPageRoutingModule, PagesModule],
})
export class DashbaordPageModule {}
