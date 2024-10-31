import { ActivatedRoute } from '@angular/router';
import { Consts, Direcitons } from '@app/utils/Constants';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { dashboardPageFactory } from './dashboard-page.provider';
import { CategoryService } from '@app/shared/services/Category/CategoryService';
import { ArticleService } from '@app/shared/services/Article/ArticleService';
import { BrandService } from '@app/shared/services/Brand/BrandService';

describe('dashboardPageFactory', () => {
  let categoryService: CategoryService;
  let brandService: BrandService;
  let articleService: ArticleService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    categoryService = TestBed.inject(CategoryService);
    brandService = TestBed.inject(BrandService);
    articleService = TestBed.inject(ArticleService);
    route = {
      snapshot: {
        data: {},
      },
    } as unknown as ActivatedRoute;
  });

  it('should login when path is login type', () => {
    jest.spyOn(categoryService, 'getEntityPage');
    route.snapshot.data[Consts.TYPE] = Consts.CATEGORY;

    const factory = dashboardPageFactory(
      route,
      categoryService,
      brandService,
      articleService
    );
    factory(Consts.ZERO, Consts.FIVE, Consts.NAME, Direcitons.ASC);

    expect(categoryService.getEntityPage).toHaveBeenCalledWith(
      Consts.ZERO,
      Consts.FIVE,
      Consts.NAME,
      Direcitons.ASC
    );
  });

  it('should login when path is login type', () => {
    jest.spyOn(brandService, 'getEntityPage');
    route.snapshot.data[Consts.TYPE] = Consts.BRAND;

    const factory = dashboardPageFactory(
      route,
      categoryService,
      brandService,
      articleService
    );
    factory(Consts.ZERO, Consts.FIVE, Consts.NAME, Direcitons.ASC);

    expect(brandService.getEntityPage).toHaveBeenCalledWith(
      Consts.ZERO,
      Consts.FIVE,
      Consts.NAME,
      Direcitons.ASC
    );
  });

  it('should sign up when path is sign up', () => {
    jest.spyOn(articleService, 'getEntityPage');
    route.snapshot.data[Consts.TYPE] = Consts.ARTICLE;

    const factory = dashboardPageFactory(
      route,
      categoryService,
      brandService,
      articleService
    );
    factory(Consts.ZERO, Consts.FIVE, Consts.NAME, Direcitons.ASC);

    expect(articleService.getEntityPage).toHaveBeenCalledWith(
      Consts.ZERO,
      Consts.FIVE,
      Consts.NAME,
      Direcitons.ASC
    );
  });

  it('should throw an error if type is not supported', () => {
    route.snapshot.data[Consts.TYPE] = Consts.DUMMY_TOKEN;

    expect(() =>
      dashboardPageFactory(
        route,
        categoryService,
        brandService,
        articleService
      )(Consts.ZERO, Consts.FIVE, Consts.NAME, Direcitons.ASC)
    ).toThrow(new Error(Consts.TYPE_NOT_SUPPORTED));
  });
});
