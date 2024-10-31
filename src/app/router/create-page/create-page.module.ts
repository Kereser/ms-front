import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePageRoutingModule } from './create-page-routing.module';
import { PagesModule } from '@app/components/pages/pages.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CreatePageRoutingModule, PagesModule],
})
export class CreatePageModule {}
