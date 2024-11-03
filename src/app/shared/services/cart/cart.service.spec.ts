import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { TypeMethods } from '../TypeMethods.enum';
import { Consts } from '@app/utils/Constants';

describe('CartService', () => {
  let service: CartService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CartService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use valid body and method to add cart', () => {
    service
      .addArticleToCart({ articleId: Consts.ONE, quantity: Consts.TEN })
      .subscribe();

    const req = httpClient.expectOne(environment.CART_BASE_URL);
    expect(req.request.method).toBe(TypeMethods.PUT);
    expect(req.request.body).toEqual({
      items: [
        {
          articleId: Consts.ONE,
          quantity: Consts.TEN,
        },
      ],
    });
    req.flush({});
  });
});
