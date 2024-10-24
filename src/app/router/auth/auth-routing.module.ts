import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from '@app/components/pages/auth-page/auth-page.component';
import { Consts } from '../../utils/Constants';

const routes: Routes = [
  {
    path: Consts.EMPTY,
    component: AuthPageComponent,
    data: { type: 'login' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
