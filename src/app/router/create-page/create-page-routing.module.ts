import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from '@app/components/pages/admin/create-page/create-page.component';
import { Consts } from '../../utils/Constants';
import { RolesGuard } from '@app/shared/guards/roles.guard';

const routes: Routes = [
  {
    path: Consts.CATEGORY,
    component: CreatePageComponent,
    canActivate: [RolesGuard],
    data: { type: Consts.CATEGORY, roles: [Consts.ADMIN] },
  },
  {
    path: Consts.BRAND,
    component: CreatePageComponent,
    canActivate: [RolesGuard],
    data: { type: Consts.BRAND, roles: [Consts.ADMIN] },
  },
  {
    path: Consts.ARTICLE,
    component: CreatePageComponent,
    canActivate: [RolesGuard],
    data: { type: Consts.ARTICLE, roles: [Consts.ADMIN] },
  },
  {
    path: Consts.AUX_DEPOT,
    component: CreatePageComponent,
    canActivate: [RolesGuard],
    data: { type: Consts.AUX_DEPOT, roles: [Consts.ADMIN] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePageRoutingModule {}
