import { Injectable } from '@angular/core';
import { CategoryService } from '../services/CategoryService';
import { ArticleService } from '../services/ArticleService';
import { IEntityService } from '../services/IEntityService';

@Injectable({
  providedIn: 'root'
})
export class EntityServiceFactory {
  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService
  ) {}

  getService(entityType: string): IEntityService {
    switch (entityType) {
      case 'category':
        return this.categoryService;
      case 'article':
        return this.articleService;
      default:
        throw new Error('No service found for given entity type');
    }
  }
}
