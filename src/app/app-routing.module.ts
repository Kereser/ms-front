import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Consts } from './utils/Constants';

const routes: Routes = [
  {
    path: Consts.EMPTY,
    redirectTo: Consts.DASHBOARD_CATEGORY_PATH,
    pathMatch: 'full',
  },
  {
    path: Consts.CREATE_PATH,
    loadChildren: () =>
      import('./router/create-page/create-page.module').then(
        (m) => m.CreatePageModule
      ),
  },
  {
    path: Consts.DASHBOARD_PATH,
    loadChildren: () =>
      import('./router/dashbaord-page/dashbaord-page.module').then(
        (m) => m.DashbaordPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
