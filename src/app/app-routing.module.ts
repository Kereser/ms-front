import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCreateComponent } from './components/molecules/form-create/form-create.component';
import {  Consts } from './utils/Constants';
import { DashboardComponent } from './components/molecules/dashboard/dashboard.component';

const routes: Routes = [
  { path: Consts.CREATE_PATH, component: FormCreateComponent },
  { path: Consts.DASHBOARD_PATH, component: DashboardComponent },
  { path: Consts.EMPTY, redirectTo: Consts.REDIRECT_DASHBOARD_PATH, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
