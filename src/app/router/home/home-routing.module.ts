import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@app/components/pages/home-page/home-page.component';
import { RolesGuard } from '@app/shared/guards/roles.guard';
import { Consts } from '@app/utils/Constants';

const routes: Routes = [
  {
    path: Consts.EMPTY,
    canActivate: [RolesGuard],
    component: HomePageComponent,
    data: { roles: [Consts.CLIENT] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
