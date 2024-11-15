import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from '@app/components/pages/cart-page/cart-page.component';
import { RolesGuard } from '@app/shared/guards/roles.guard';
import { Consts } from '@app/utils/Constants';

const routes: Routes = [
  {
    path: Consts.OVERVIEW,
    canActivate: [RolesGuard],
    component: CartPageComponent,
    data: { roles: [Consts.CLIENT] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
