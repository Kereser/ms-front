import { Injectable } from '@angular/core';
import { CategoryService } from '../../services/Category/CategoryService';
import { ArticleService } from '../../services/Article/ArticleService';
import { IPageableService } from '../../services/IPageableService';
import { BrandService } from '../../services/Brand/BrandService';
import { IDynamicFormEntity } from '../../services/IDynamicFormEntity';
import { UserService } from '../../services/user/user.service';
import { Consts } from '../../../utils/Constants';

@Injectable({
  providedIn: 'root',
})
export class EntityServiceFactory {
  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private brandService: BrandService,
    private userService: UserService
  ) {}

  private getServiceByType(
    entityType: string
  ): IPageableService | IDynamicFormEntity {
    switch (entityType) {
      case 'category':
        return this.categoryService;
      case 'brand':
        return this.brandService;
      case 'article':
        return this.articleService;
      case 'aux-depot':
        return this.userService;
      default:
        throw new Error(Consts.NOT_FOUND_ENTITY);
    }
  }

  getPageableService(entityType: string): IPageableService {
    const service = this.getServiceByType(entityType);
    if (service instanceof UserService) {
      throw new Error(Consts.NOT_FOUND_ENTITY);
    }
    return service as IPageableService;
  }

  getFormCreationService(entityType: string): IDynamicFormEntity {
    return this.getServiceByType(entityType) as IDynamicFormEntity;
  }
}
