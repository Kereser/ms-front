import { TestBed } from '@angular/core/testing';
import { EntityServiceFactory } from './EntityServiceFactory';
import { CategoryService } from '../../services/Category/CategoryService';
import { ArticleService } from '../../services/Article/ArticleService';
import { BrandService } from '../../services/Brand/BrandService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Consts } from '../../../utils/Constants';

describe('EntityServiceFactory', () => {
  let serviceFactory: EntityServiceFactory;
  let categoryService: CategoryService;
  let articleService: ArticleService;
  let brandService: BrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EntityServiceFactory,
        CategoryService,
        ArticleService,
        BrandService,
      ],
    });

    serviceFactory = TestBed.inject(EntityServiceFactory);
    categoryService = TestBed.inject(CategoryService);
    articleService = TestBed.inject(ArticleService);
    brandService = TestBed.inject(BrandService);
  });

  it('should return CategoryService for "category"', () => {
    const service = serviceFactory.getService(Consts.CATEGORY.toLowerCase());
    expect(service).toBe(categoryService);
  });

  it('should return BrandService for "brand"', () => {
    const service = serviceFactory.getService(Consts.BRAND.toLowerCase());
    expect(service).toBe(brandService);
  });

  it('should return ArticleService for "article"', () => {
    const service = serviceFactory.getService(Consts.ARTICLE.toLowerCase());
    expect(service).toBe(articleService);
  });

  it('should throw an error for unknown entity type', () => {
    expect(() => serviceFactory.getService('unknown')).toThrowError('No service found for given entity type');
  });
});
