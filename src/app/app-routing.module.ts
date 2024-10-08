import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/molecules/article-list/article-list.component';
import { FormCreateComponent } from './components/molecules/form-create/form-create.component';
import { Constants } from './utils/Constants';

const routes: Routes = [
  { path: Constants.CREATE_PATH, component: FormCreateComponent },
  { path: Constants.DASHBOARD_PATH, component: ArticleListComponent },
  { path: Constants.EMPTY, redirectTo: Constants.REDIRECT_DASHBOARD_PATH, pathMatch: Constants.FULL_PATH }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
