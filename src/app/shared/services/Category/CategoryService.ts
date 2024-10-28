import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageableService } from '../IPageableService';
import { environment } from '../../../../environments/environment';
import { Consts } from '../../../utils/Constants';
import { CategoryModel } from '@app/shared/models/CategoryModel';
import { PageDTO } from '../../models/PageDTO';
import { IDynamicFormEntity } from '../IDynamicFormEntity';

export type CategoryFrom = {
  name: string;
  description: string;
};

export type CategoryRequest = {
  name: string;
  description: string;
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements IPageableService {
  private baseURL = environment.STOCK_BASE_URL + Consts.CATEGORIES_PATH;
  private byNameURL = this.baseURL + Consts.BY_NAMES_PATH;

  constructor(private http: HttpClient) {}

  createCategory(category: CategoryFrom): Observable<unknown> {
    return this.http.post(this.baseURL, category);
  }

  getEntityPage(
    page: number,
    pageSize: number,
    column: string,
    sortOrder: string
  ): Observable<PageDTO<CategoryModel>> {
    const direction = sortOrder.toUpperCase();
    return this.http.get<PageDTO<CategoryModel>>(this.baseURL, {
      params: { page, pageSize, column, direction },
    });
  }

  getByNames(names: string): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.byNameURL, {
      params: { names },
    });
  }
}
