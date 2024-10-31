import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PagesModule } from '@app/components/pages/pages.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, PagesModule],
})
export class AuthModule {}
