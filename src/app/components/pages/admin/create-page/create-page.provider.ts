import { ActivatedRoute } from '@angular/router';
import {
  ArticleForm,
  ArticleService,
} from '@app/shared/services/Article/ArticleService';
import {
  BrandForm,
  BrandService,
} from '@app/shared/services/Brand/BrandService';
import {
  CategoryFrom,
  CategoryService,
} from '@app/shared/services/Category/CategoryService';
import {
  NewUserForm,
  UserService,
} from '@app/shared/services/user/user.service';
import { Consts } from '@app/utils/Constants';

export const createPageFactoryProvider = (
  userService: UserService,
  categoryService: CategoryService,
  brandService: BrandService,
  articleService: ArticleService,
  route: ActivatedRoute
) => {
  switch (route.snapshot.data[Consts.TYPE]) {
    case Consts.CATEGORY:
      return (entity: CategoryFrom) => categoryService.createCategory(entity);
    case Consts.BRAND:
      return (entity: BrandForm) => brandService.createBrand(entity);
    case Consts.ARTICLE:
      return (entity: ArticleForm) => articleService.createArticle(entity);
    case Consts.AUX_DEPOT:
      return (entity: NewUserForm) => userService.createAuxDepot(entity);

    default:
      throw new Error(Consts.TYPE_NOT_SUPPORTED);
  }
};
