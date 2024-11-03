import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@app/components/pages/home-page/home-page.component';
import { Consts } from '@app/utils/Constants';

const routes: Routes = [
  {
    path: Consts.EMPTY,
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
