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
import { Consts, StatusCodes, ToastTypes } from '@app/utils/Constants';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  let cartService: CartService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

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

  it('should correctly form a article categories', () => {
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
});
