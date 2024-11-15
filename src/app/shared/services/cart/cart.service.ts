import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Consts } from '@app/utils/Constants';
import { PageDTO } from '@app/shared/models/PageDTO';
import { CartPageable } from '@app/shared/models/CartPageable';
import { CartArticleModel } from '@app/shared/models/CartArticleModel';

export type ArticleCart = {
  articleId: number;
  quantity: number;
};

export interface PageCartDTO<T> extends PageDTO<T> {
  cart: CartPageable;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = environment.CART_BASE_URL;
  private getArticlesURL =
    this.baseURL + Consts.USER_PATH + Consts.ARTICLES_PATH;

  constructor(private http: HttpClient) {}

  addArticleToCart(entity: ArticleCart): Observable<unknown> {
    return this.http.put(this.baseURL, { items: [entity] });
  }

  deleteArticle(cartId: number, articleId: number) {
    return this.http.delete(
      `${this.baseURL}/${cartId}${Consts.ARTICLES_PATH}/${articleId}`
    );
  }

  getArticlesForUser(
    page: number,
    pageSize: number,
    direction: string,
    categoryName: string | null,
    brandName: string | null
  ): Observable<PageCartDTO<CartArticleModel>> {
    return this.http.get<PageCartDTO<CartArticleModel>>(this.getArticlesURL, {
      params: {
        page,
        pageSize,
        direction: direction.toUpperCase(),
        categoryName: categoryName ?? '',
        brandName: brandName ?? '',
      },
    });
  }
}
