import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/molecules/article-list/article-list.component';
import { FormCreateComponent } from './components/molecules/form-create/form-create.component';
import {  Consts } from './utils/Constants';

const routes: Routes = [
  { path: Consts.CREATE_PATH, component: FormCreateComponent },
  { path: Consts.DASHBOARD_PATH, component: ArticleListComponent },
  { path: Consts.EMPTY, redirectTo: Consts.REDIRECT_DASHBOARD_PATH, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
