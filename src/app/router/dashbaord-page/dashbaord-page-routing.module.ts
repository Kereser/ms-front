import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from '@app/components/pages/admin/dashboard-page/dashboard-page.component';
import { RolesGuard } from '@app/shared/guards/roles.guard';
import { Consts } from '@app/utils/Constants';

const routes: Routes = [
  {
    path: Consts.CATEGORY,
    canActivate: [RolesGuard],
    component: DashboardPageComponent,
    data: { type: Consts.CATEGORY, roles: [Consts.ANY_ROLE] },
  },
  {
    path: Consts.BRAND,
    canActivate: [RolesGuard],
    component: DashboardPageComponent,
    data: { type: Consts.BRAND, roles: [Consts.ANY_ROLE] },
  },
  {
    path: Consts.ARTICLE,
    canActivate: [RolesGuard],
    component: DashboardPageComponent,
    data: { type: Consts.ARTICLE, roles: [Consts.ANY_ROLE] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbaordPageRoutingModule {}
