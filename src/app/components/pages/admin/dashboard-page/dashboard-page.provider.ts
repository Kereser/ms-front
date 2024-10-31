import { ActivatedRoute } from '@angular/router';
import { PageableType } from '@app/shared/models/PageableType';
import { PageDTO } from '@app/shared/models/PageDTO';
import { ArticleService } from '@app/shared/services/Article/ArticleService';
import { BrandService } from '@app/shared/services/Brand/BrandService';
import { CategoryService } from '@app/shared/services/Category/CategoryService';
import { Consts, Direcitons } from '@app/utils/Constants';
import { Observable } from 'rxjs';

type RoleRoutes = {
  [key: string]: (
    page: number,
    pageSize: number,
    column: string,
    direction: Direcitons
  ) => Observable<PageDTO<PageableType>>;
};

export const dashboardPageFactory = (
  route: ActivatedRoute,
  categoryService: CategoryService,
  brandService: BrandService,
  articleService: ArticleService
) => {
  const currentRoute = route.snapshot.data[Consts.TYPE];
  const routes: RoleRoutes = {
    [Consts.CATEGORY]: (
      page: number,
      pageSize: number,
      column: string,
      direction: Direcitons
    ) => categoryService.getEntityPage(page, pageSize, column, direction),
    [Consts.BRAND]: (
      page: number,
      pageSize: number,
      column: string,
      direction: Direcitons
    ) => brandService.getEntityPage(page, pageSize, column, direction),
    [Consts.ARTICLE]: (
      page: number,
      pageSize: number,
      column: string,
      direction: Direcitons
    ) => articleService.getEntityPage(page, pageSize, column, direction),
  };

  if (currentRoute && currentRoute in routes) {
    return routes[currentRoute];
  }

  throw new Error(Consts.TYPE_NOT_SUPPORTED);
};
