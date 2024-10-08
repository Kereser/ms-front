import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/molecules/article-list/article-list.component';
import { FormCreateComponent } from './components/molecules/form-create/form-create.component';

const routes: Routes = [
  { path: 'create/:type', component: FormCreateComponent }, // Ruta dinámica con un parámetro
  { path: 'dashboard', component: ArticleListComponent }, // Ruta para el Dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' } // Redirige a Dashboard si la ruta está vacía
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
