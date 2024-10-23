import { TestBed } from '@angular/core/testing';
import { EntityServiceFactory } from './EntityServiceFactory';
import { CategoryService } from '../../services/Category/CategoryService';
import { ArticleService } from '../../services/Article/ArticleService';
import { BrandService } from '../../services/Brand/BrandService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Consts } from '../../../utils/Constants';
import { UserService } from '../../services/user/user.service';

describe('EntityServiceFactory', () => {
  let serviceFactory: EntityServiceFactory;
  let categoryService: CategoryService;
  let articleService: ArticleService;
  let brandService: BrandService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EntityServiceFactory,
        CategoryService,
        ArticleService,
        BrandService,
        UserService,
      ],
    });

    serviceFactory = TestBed.inject(EntityServiceFactory);
    categoryService = TestBed.inject(CategoryService);
    articleService = TestBed.inject(ArticleService);
    brandService = TestBed.inject(BrandService);
    userService = TestBed.inject(UserService);
  });

  it('should return CategoryService for "category"', () => {
    const service = serviceFactory.getPageableService(
      Consts.CATEGORY.toLowerCase()
    );
    expect(service).toBe(categoryService);
  });

  it('should return BrandService for "brand"', () => {
    const service = serviceFactory.getPageableService(
      Consts.BRAND.toLowerCase()
    );
    expect(service).toBe(brandService);
  });

  it('should return ArticleService for "article"', () => {
    const service = serviceFactory.getPageableService(
      Consts.ARTICLE.toLowerCase()
    );
    expect(service).toBe(articleService);
  });

  it('should return UserService for "aux-depot"', () => {
    const service = serviceFactory.getFormCreationService(
      Consts.AUX_DEPOT.toLowerCase()
    );
    expect(service).toBe(userService);
  });

  it('should throw an error for unknown entity type', () => {
    expect(() => serviceFactory.getPageableService('unknown')).toThrowError(
      'No service found for given entity type'
    );
  });

  it('should throw an error when trying to get an entity that is not pageable', () => {
    expect(() => serviceFactory.getPageableService('aux-depot')).toThrowError(
      'No service found for given entity type'
    );
  });
});
