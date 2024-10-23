import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from '@app/components/pages/admin/create-page/create-page.component';
import { Consts } from '../../utils/Constants';

const routes: Routes = [
  {
    path: Consts.CATEGORY,
    component: CreatePageComponent,
    data: { type: Consts.CATEGORY },
  },
  {
    path: Consts.BRAND,
    component: CreatePageComponent,
    data: { type: Consts.BRAND },
  },
  {
    path: Consts.ARTICLE,
    component: CreatePageComponent,
    data: { type: Consts.ARTICLE },
  },
  {
    path: Consts.AUX_DEPOT,
    component: CreatePageComponent,
    data: { type: Consts.AUX_DEPOT },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePageRoutingModule {}
