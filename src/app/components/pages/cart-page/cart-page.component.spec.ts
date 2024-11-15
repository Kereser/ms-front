import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageComponent } from './cart-page.component';
import {
  CartService,
  PageCartDTO,
} from '@app/shared/services/cart/cart.service';
import { ToastService } from '@app/shared/services/toast/toast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CartArticleModel } from '@app/shared/models/CartArticleModel';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Consts,
  Direcitons,
  StatusCodes,
  ToastTypes,
} from '@app/utils/Constants';
import { RadioButtonComponent } from '@app/components/atoms/radio-button/radio-button.component';
import { QueryList } from '@angular/core';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let radioButtons: QueryList<RadioButtonComponent>;

  let cartService: CartService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartPageComponent, RadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    radioButtons = component.radioButtons;

    cartService = TestBed.inject(CartService);
    toastService = TestBed.inject(ToastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all cart articles', () => {
    const pageCartDTO = {} as PageCartDTO<CartArticleModel>;
    jest
      .spyOn(cartService, 'getArticlesForUser')
      .mockReturnValue(of(pageCartDTO));

    component.loadData();

    expect(cartService.getArticlesForUser).toHaveBeenCalledTimes(1);
    expect(component.cartPageable).toEqual(pageCartDTO);
  });

  it('should get all cart articles', () => {
    jest.spyOn(toastService, 'show');
    jest.spyOn(cartService, 'getArticlesForUser').mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: StatusCodes.BadRequest,
            error: {
              message: Consts.BAD_REQUEST_MSG,
            },
          })
      )
    );

    component.loadData();

    expect(cartService.getArticlesForUser).toHaveBeenCalledTimes(Consts.ONE);
    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      Consts.BAD_REQUEST_MSG
    );
  });

  it('should navigate to home', () => {
    jest.spyOn(component['router'], 'navigate');

    component.handleNavigateToHome();

    expect(component['router'].navigate).toHaveBeenCalledWith([
      Consts.HOME_PATH,
    ]);
  });

  it('should handle logout', () => {
    jest.spyOn(component['router'], 'navigate');

    component.handleOnLogut();

    expect(component['router'].navigate).toHaveBeenCalledWith([
      Consts.AUTH_LOGIN_PATH,
    ]);
  });

  it('should delete article from cart', () => {
    jest.spyOn(cartService, 'deleteArticle').mockReturnValue(of({}));
    jest.spyOn(toastService, 'show');

    component.cartPageable = {
      cart: {
        id: Consts.TWENTY,
      },
    } as PageCartDTO<CartArticleModel>;

    const cartArticle = {
      id: Consts.ONE,
      cartQuantity: Consts.TEN,
      name: Consts.ARTICLE,
    } as CartArticleModel;

    component.handleDeleteFromCart(cartArticle);

    expect(cartService.deleteArticle).toHaveBeenCalledWith(
      Consts.TWENTY,
      cartArticle.id
    );
    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.SUCCESS,
      `${cartArticle.name} successful deleted`
    );
  });

  it('should handle error when deleting article from cart', () => {
    jest.spyOn(toastService, 'show');
    jest.spyOn(cartService, 'deleteArticle').mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: StatusCodes.BadRequest,
            error: {
              message: Consts.BAD_REQUEST_MSG,
            },
          })
      )
    );

    component.cartPageable = {
      cart: {
        id: Consts.TWENTY,
      },
    } as PageCartDTO<CartArticleModel>;

    const cartArticle = {
      id: Consts.ONE,
      cartQuantity: Consts.TEN,
      name: Consts.ARTICLE,
    } as CartArticleModel;

    component.handleDeleteFromCart(cartArticle);

    expect(cartService.deleteArticle).toHaveBeenCalledWith(
      Consts.TWENTY,
      cartArticle.id
    );

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      Consts.BAD_REQUEST_MSG
    );
  });

  it('should correctly format article categories', () => {
    component.cartPageable = {
      content: [
        {
          id: Consts.TWENTY,
          name: Consts.ARTICLE,
          categories: [
            {
              name: Consts.CATEGORIES,
            },
          ],
        },
      ],
    } as PageCartDTO<CartArticleModel>;

    const res = component.getCategoriesForArticle(Consts.ARTICLE);

    expect(res).toBe(` ${Consts.CATEGORIES}`);
  });

  it('should get valid article price', () => {
    const article = {
      id: Consts.TWENTY,
      name: Consts.ARTICLE,
      price: Consts.TEN,
      cartQuantity: Consts.TEN,
    } as CartArticleModel;

    const price = component.getArticleCartPrice(article);

    expect(price).toBe(' 100');
  });

  it('should call resetData on all radio buttons and initialize data on reset', () => {
    radioButtons.forEach((radioButton) => {
      jest.spyOn(radioButton, 'resetData');
    });

    jest.spyOn(component, 'setInitialData');

    jest.spyOn(component, 'loadData');
    component.onReset();

    radioButtons.forEach((radioButton) => {
      expect(radioButton.resetData).toHaveBeenCalled();
    });

    expect(component.setInitialData).toHaveBeenCalled();
    expect(component.loadData).toHaveBeenCalled();
  });

  it('should get initial categories', () => {
    component.cartPageable = {
      content: [
        {
          id: Consts.TWENTY,
          name: Consts.ARTICLE,
          categories: [
            {
              name: Consts.CATEGORIES,
            },
            {
              name: Consts.ARTICLE,
            },
          ],
        },
      ],
    } as PageCartDTO<CartArticleModel>;

    const res = component.getInitialCategories();

    expect(res).toEqual(new Set([Consts.CATEGORIES, Consts.ARTICLE]));
  });

  it('should get initial brands', () => {
    component.cartPageable = {
      content: [
        {
          id: Consts.TWENTY,
          name: Consts.ARTICLE,
          brand: {
            name: Consts.BRAND,
          },
        },
      ],
    } as PageCartDTO<CartArticleModel>;

    const res = component.getInitialBrands();

    expect(res).toEqual(new Set([Consts.BRAND]));
  });

  it('should filter by category', () => {
    jest.spyOn(component, 'loadData');
    component.filterByCategory(Consts.CATEGORIES);

    expect(component.categoryName).toBe(Consts.CATEGORIES);
    expect(component.loadData).toHaveBeenCalledTimes(Consts.ONE);
  });

  it('should filter by brand', () => {
    jest.spyOn(component, 'loadData');
    component.filterByBrand(Consts.BRAND);

    expect(component.brandName).toBe(Consts.BRAND);
    expect(component.loadData).toHaveBeenCalledTimes(Consts.ONE);
  });

  it('should order', () => {
    jest.spyOn(component, 'loadData');

    component.onSortSelected(Consts.ASC);
    expect(component.order).toBe(Direcitons.ASC);
    expect(component.loadData).toHaveBeenCalledTimes(1);

    component.onSortSelected(Consts.DESC);
    expect(component.order).toBe(Direcitons.DESC);
    expect(component.loadData).toHaveBeenCalledTimes(2);
  });

  it('should set initial data', () => {
    component.setInitialData();

    expect(component.order).toBe(Direcitons.ASC);
    expect(component.categoryName).toBe(null);
    expect(component.brandName).toBe(null);
  });

  it('should update currentPage', () => {
    jest.spyOn(component, 'loadData');

    component.updateCurrentPage(Consts.TEN);

    expect(component.page).toBe(Consts.TEN);
    expect(component.loadData).toHaveBeenCalledTimes(1);
  });

  it('should handle table size', () => {
    jest.spyOn(component, 'loadData');

    component.handleTableSize(Consts.TEN.toString());

    expect(component.pageSize).toBe(Consts.TEN);
    expect(component.loadData).toHaveBeenCalledTimes(1);
  });
});
