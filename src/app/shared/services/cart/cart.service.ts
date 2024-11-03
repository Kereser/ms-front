import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export type ArticleCart = {
  articleId: number;
  quantity: number;
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = environment.CART_BASE_URL;

  constructor(private http: HttpClient) {}

  addArticleToCart(entity: ArticleCart): Observable<unknown> {
    return this.http.put(this.baseURL, { items: [entity] });
  }
}
