import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from '@app/components/pages/auth-page/auth-page.component';
import { Consts } from '../../utils/Constants';
import { LoginGuard } from '@app/shared/guards/login.guard';

const routes: Routes = [
  {
    path: Consts.LOGIN,
    component: AuthPageComponent,
    canActivate: [LoginGuard],
    data: { type: 'login' },
  },
  {
    path: Consts.SINGUP,
    component: AuthPageComponent,
    data: { type: 'signup' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
