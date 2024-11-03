import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Consts } from './utils/Constants';

const routes: Routes = [
  {
    path: Consts.EMPTY,
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: Consts.CREATE,
    loadChildren: () =>
      import('./router/create-page/create-page.module').then(
        (m) => m.CreatePageModule
      ),
  },
  {
    path: Consts.DASHBOARD,
    loadChildren: () =>
      import('./router/dashbaord-page/dashbaord-page.module').then(
        (m) => m.DashbaordPageModule
      ),
  },
  {
    path: Consts.AUTH,
    loadChildren: () =>
      import('./router/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./router/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
