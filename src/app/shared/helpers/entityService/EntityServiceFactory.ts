import { Injectable } from '@angular/core';
import { CategoryService } from '../../services/Category/CategoryService';
import { ArticleService } from '../../services/Article/ArticleService';
import { IEntityService } from '../../services/IEntityService';
import { BrandService } from '../../services/Brand/BrandService';

@Injectable({
  providedIn: 'root'
})
export class EntityServiceFactory {
  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private brandService: BrandService
  ) {}

  getService(entityType: string): IEntityService {
    switch (entityType) {
      case 'category':
        return this.categoryService;
      case 'brand':
        return this.brandService;
      case 'article':
        return this.articleService;
      default:
        throw new Error('No service found for given entity type');
    }
  }
}
