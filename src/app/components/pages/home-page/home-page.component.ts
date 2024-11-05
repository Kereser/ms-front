import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleModel } from '@app/shared/models/ArticleModel';
import { PageDTO } from '@app/shared/models/PageDTO';
import { ArticleService } from '@app/shared/services/Article/ArticleService';
import {
  ArticleCart,
  CartService,
} from '@app/shared/services/cart/cart.service';
import { ToastService } from '@app/shared/services/toast/toast.service';
import { UserService } from '@app/shared/services/user/user.service';
import {
  Consts,
  Direcitons,
  StatusCodes,
  ToastTypes,
} from '@app/utils/Constants';

type articleIdToQuantityMap = {
  [key: number]: number;
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  articles!: PageDTO<ArticleModel>;
  articleIdToQuantiyMap: articleIdToQuantityMap = {};
  page: number = Consts.ZERO;

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.articleService
      .getEntityPage(this.page, 6, 'name', Direcitons.ASC)
      .subscribe({
        next: (data) => {
          this.articles = data;
        },
      });
  }

  onLogout() {
    this.userService.logout();
  }

  updateCurrentPage(page: number) {
    this.page = page;
    this.loadData();
  }

  getCategoriesForArticle(articleName: string) {
    return this.articles.content
      .filter((a) => a.name === articleName)
      .map((a) => a.categories.map((c) => ` ${c.name}`))
      .join(', ');
  }

  getQuantiyForArticle(article: ArticleModel): string[] {
    const arr = [];

    for (let i = 1; i <= article.quantity; i++) {
      arr.push(i.toString());
    }

    return arr;
  }

  handleSelectQuantityForArticle(quantity: string, article: ArticleModel) {
    this.articleIdToQuantiyMap[article.id] = parseInt(quantity);
  }

  handleAddToCart(article: ArticleModel) {
    const entity = this.buildCartPayload(article);

    this.cartService.addArticleToCart(entity).subscribe({
      next: (_) => {
        this.toastService.show(
          ToastTypes.SUCCESS,
          `Article ${article.name} has been added to cart.`
        );
      },
      error: (err) => {
        this.handleError(err, article.name);
      },
    });
  }

  navigateToCart() {
    this.router.navigate([Consts.CART_OVERVIEW_PATH]);
  }

  private handleError(err: HttpErrorResponse, articleName: string) {
    console.log('error', err);
    let msg = `An error ocurred while trying to add ${articleName} to cart`;

    if (err.status === StatusCodes.Conflict) {
      msg = err.error.message;
    }

    this.toastService.show(ToastTypes.DANGER, msg);
  }

  private buildCartPayload(article: ArticleModel) {
    const articleId = article.id;

    return {
      articleId: article.id,
      quantity: this.articleIdToQuantiyMap[articleId],
    } as ArticleCart;
  }
}
