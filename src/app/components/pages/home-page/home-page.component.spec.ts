import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '@app/shared/services/user/user.service';
import { ArticleService } from '@app/shared/services/Article/ArticleService';
import { CartService } from '@app/shared/services/cart/cart.service';
import { ToastService } from '@app/shared/services/toast/toast.service';
import { PageDTO } from '@app/shared/models/PageDTO';
import { ArticleModel } from '@app/shared/models/ArticleModel';
import { CategoryArticleModel } from '@app/shared/models/CategoryArticleModel';
import { Consts, StatusCodes, ToastTypes } from '@app/utils/Constants';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let userService: UserService;
  let articleService: ArticleService;
  let cartService: CartService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);
    articleService = TestBed.inject(ArticleService);
    cartService = TestBed.inject(CartService);
    toastService = TestBed.inject(ToastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set articles with data from articles page', () => {
    jest
      .spyOn(articleService, 'getEntityPage')
      .mockReturnValue(
        of({ content: [{ name: Consts.ARTICLE }] } as PageDTO<ArticleModel>)
      );

    component.page = Consts.ZERO;
    component.loadData();

    expect(component.articles).toEqual({
      content: [{ name: Consts.ARTICLE }],
    } as PageDTO<ArticleModel>);
  });

  it('should logout', () => {
    jest.spyOn(userService, 'logout');

    component.onLogout();

    expect(userService.logout).toHaveBeenCalledTimes(1);
  });

  it('should update current page', () => {
    jest.spyOn(component, 'loadData');

    component.updateCurrentPage(1);

    expect(component.page).toBe(1);
    expect(component.loadData).toHaveBeenCalledTimes(1);
  });

  it('should get category names for given article', () => {
    component.articles = {
      content: [
        {
          name: Consts.ARTICLE,
          categories: [
            {
              id: Consts.ONE,
              name: Consts.CATEGORY_NAMES,
            },
            {
              id: Consts.TWO,
              name: Consts.CATEGORY_NAMES,
            },
          ] as CategoryArticleModel[],
        },
      ],
    } as PageDTO<ArticleModel>;

    const categories = component.getCategoriesForArticle(Consts.ARTICLE);

    expect(categories).toBe(
      `${Consts.CATEGORY_NAMES},${Consts.CATEGORY_NAMES}`
    );
  });

  it('should get array of article quantity', () => {
    const article = {
      name: Consts.ARTICLE,
      quantity: 2,
    } as ArticleModel;

    const res = component.getQuantiyForArticle(article);
    expect(res).toEqual(['1', '2']);
  });

  it('should add quantity to articleQuantityMap', () => {
    component.articleIdToQuantiyMap = {};

    const article = {
      id: Consts.ONE,
      name: Consts.ARTICLE,
      quantity: 2,
    } as ArticleModel;

    component.handleSelectQuantityForArticle(Consts.TEN.toString(), article);

    expect(component.articleIdToQuantiyMap[article.id]).toBe(Consts.TEN);
  });

  it('should build cart payload', () => {
    const article = {
      id: Consts.ONE,
      name: Consts.ARTICLE,
      quantity: 2,
    } as ArticleModel;

    component.handleSelectQuantityForArticle(Consts.TEN.toString(), article);
    const res = component['buildCartPayload'](article);

    expect(res).toEqual({
      articleId: Consts.ONE,
      quantity: Consts.TEN,
    });
  });

  it('should send valid payload and manage valid event when add to cart', () => {
    jest.spyOn(cartService, 'addArticleToCart').mockReturnValue(of({}));
    jest.spyOn(toastService, 'show');

    const article = {
      id: Consts.ONE,
      name: Consts.ARTICLE,
      quantity: 2,
    } as ArticleModel;

    component.handleSelectQuantityForArticle(Consts.TEN.toString(), article);
    component.handleAddToCart(article);

    expect(cartService.addArticleToCart).toHaveBeenCalledWith({
      articleId: Consts.ONE,
      quantity: Consts.TEN,
    });

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.SUCCESS,
      'Article article has been added to cart.'
    );
  });

  it('should handleError when add to cart -- other than 409', () => {
    jest
      .spyOn(cartService, 'addArticleToCart')
      .mockReturnValue(
        throwError(
          () => new HttpErrorResponse({ status: StatusCodes.BadRequest })
        )
      );
    jest.spyOn(toastService, 'show');

    const article = {
      id: Consts.ONE,
      name: Consts.ARTICLE,
      quantity: 2,
    } as ArticleModel;

    component.handleSelectQuantityForArticle(Consts.TEN.toString(), article);
    component.handleAddToCart(article);

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      `An error ocurred while trying to add ${article.name} to cart`
    );
  });

  it('should handleError with 409 when add to cart', () => {
    jest.spyOn(cartService, 'addArticleToCart').mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: StatusCodes.Conflict,
            error: { message: Consts.EX_MSG },
          })
      )
    );
    jest.spyOn(toastService, 'show');

    const article = {
      id: Consts.ONE,
      name: Consts.ARTICLE,
      quantity: 2,
    } as ArticleModel;

    component.handleSelectQuantityForArticle(Consts.TEN.toString(), article);
    component.handleAddToCart(article);

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      Consts.EX_MSG
    );
  });
});
