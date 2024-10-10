import { TestBed } from '@angular/core/testing';
import { EntityServiceFactory } from './EntityServiceFactory';
import { CategoryService } from '../services/CategoryService';
import { ArticleService } from '../services/ArticleService';
import { IEntityService } from '../services/IEntityService';

describe('EntityServiceFactory', () => {
  let serviceFactory: EntityServiceFactory;
  let categoryServiceMock: IEntityService;
  let articleServiceMock: IEntityService;

  beforeEach(() => {
    categoryServiceMock = {} as IEntityService;
    articleServiceMock = {} as IEntityService;

    TestBed.configureTestingModule({
      providers: [
        EntityServiceFactory,
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: ArticleService, useValue: articleServiceMock }
      ]
    });

    serviceFactory = TestBed.inject(EntityServiceFactory);
  });

  it('should be created', () => {
    expect(serviceFactory).toBeTruthy();
  });

  it('should return CategoryService when entityType is "category"', () => {
    const service = serviceFactory.getService('category');
    expect(service).toBe(categoryServiceMock);
  });

  it('should return ArticleService when entityType is "article"', () => {
    const service = serviceFactory.getService('article');
    expect(service).toBe(articleServiceMock);
  });

  it('should throw an error when entityType is unknown', () => {
    expect(() => serviceFactory.getService('unknown')).toThrowError('No service found for given entity type');
  });
});
