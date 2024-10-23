import { Observable } from 'rxjs';
import { ArticleModel } from '@app/shared/models/ArticleModel';
import { BrandModel } from '@app/shared/models/BrandModel';
import { CategoryModel } from '@app/shared/models/CategoryModel';
import { PageDTO } from '../models/PageDTO';

export type Model = ArticleModel | BrandModel | CategoryModel;

export interface IEntityService {
  getEntityPage(
    page: number,
    pageSize: number,
    column: string,
    direction: string
  ): Observable<PageDTO<Model>>;
}
