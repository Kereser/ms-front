import { UserService } from '@app/shared/services/user/user.service';
import { CategoryService } from '@app/shared/services/Category/CategoryService';
import { BrandService } from '@app/shared/services/Brand/BrandService';
import { ArticleService } from '@app/shared/services/Article/ArticleService';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '@app/utils/Constants';
import { createPageFactoryProvider } from './create-page.provider';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('createPageFactoryProvider', () => {
  let userService: UserService;
  let categoryService: CategoryService;
  let brandService: BrandService;
  let articleService: ArticleService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    categoryService = TestBed.inject(CategoryService);
    brandService = TestBed.inject(BrandService);
    articleService = TestBed.inject(ArticleService);

    route = {
      snapshot: {
        data: {},
      },
    } as unknown as ActivatedRoute;
  });

  it('should create a category', () => {
    jest.spyOn(categoryService, 'createCategory');
    route.snapshot.data[Consts.TYPE] = Consts.CATEGORY;
    const entity = {} as any;

    const factory = createPageFactoryProvider(
      userService,
      categoryService,
      brandService,
      articleService,
      route
    );

    factory(entity);

    expect(categoryService.createCategory).toHaveBeenCalledWith(entity);
  });

  it('should create a brand', () => {
    jest.spyOn(brandService, 'createBrand');
    route.snapshot.data[Consts.TYPE] = Consts.BRAND;
    const entity = {} as any;

    const factory = createPageFactoryProvider(
      userService,
      categoryService,
      brandService,
      articleService,
      route
    );

    factory(entity);

    expect(brandService.createBrand).toHaveBeenCalledWith(entity);
  });

  it('should create an article', () => {
    jest.spyOn(articleService, 'createArticle');
    route.snapshot.data[Consts.TYPE] = Consts.ARTICLE;
    const entity = {} as any;

    const factory = createPageFactoryProvider(
      userService,
      categoryService,
      brandService,
      articleService,
      route
    );

    factory(entity);

    expect(articleService.createArticle).toHaveBeenCalledWith(entity);
  });

  it('should create a new user', () => {
    jest.spyOn(userService, 'createAuxDepot');
    route.snapshot.data[Consts.TYPE] = Consts.AUX_DEPOT;
    const entity = {} as any;

    const factory = createPageFactoryProvider(
      userService,
      categoryService,
      brandService,
      articleService,
      route
    );

    factory(entity);

    expect(userService.createAuxDepot).toHaveBeenCalledWith(entity);
  });

  it('should throw an error if type is not supported', () => {
    route.snapshot.data[Consts.TYPE] = 'UNKNOWN';
    const entity = {} as any;

    expect(() =>
      createPageFactoryProvider(
        userService,
        categoryService,
        brandService,
        articleService,
        route
      )(entity)
    ).toThrow(new Error(Consts.TYPE_NOT_SUPPORTED));
  });
});
