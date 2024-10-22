import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from '@app/components/pages/admin/dashboard-page/dashboard-page.component';
import { Consts } from '@app/utils/Constants';

const routes: Routes = [
  {
    path: Consts.CATEGORY,
    component: DashboardPageComponent,
    data: { type: Consts.CATEGORY },
  },
  {
    path: Consts.BRAND,
    component: DashboardPageComponent,
    data: { type: Consts.BRAND },
  },
  {
    path: Consts.ARTICLE,
    component: DashboardPageComponent,
    data: { type: Consts.ARTICLE },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbaordPageRoutingModule {}
