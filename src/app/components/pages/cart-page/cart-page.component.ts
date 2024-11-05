import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartArticleModel } from '@app/shared/models/CartArticleModel';
import {
  CartService,
  PageCartDTO,
} from '@app/shared/services/cart/cart.service';
import { ToastService } from '@app/shared/services/toast/toast.service';
import { UserService } from '@app/shared/services/user/user.service';
import { Consts, StatusCodes, ToastTypes } from '@app/utils/Constants';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartPageable!: PageCartDTO<CartArticleModel>;

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.cartService.getArticlesForUser().subscribe({
      next: (data) => {
        this.cartPageable = data;
      },
      error: (ex) => {
        this.handleErrors(ex);
      },
    });
  }

  handleErrors(ex: HttpErrorResponse) {
    const clientErrorStatuses = new Set([
      StatusCodes.BadRequest,
      StatusCodes.Conflict,
      StatusCodes.Forbidden,
    ]);

    let msg = 'Unexpected error';
    if (clientErrorStatuses.has(ex.status)) {
      msg = ex.error?.message || 'Client error occurred';
    }

    this.toastService.show(ToastTypes.DANGER, msg);
  }

  handleNavigateToHome() {
    this.router.navigate([Consts.HOME_PATH]);
  }

  handleOnLogut() {
    this.userService.logout();
  }

  handleDeleteFromCart(article: CartArticleModel) {
    this.cartService
      .deleteArticle(this.cartPageable.cart.id, article.id)
      .subscribe({
        next: (_) => {
          this.toastService.show(
            ToastTypes.SUCCESS,
            `${article.name} successful deleted`
          );
          this.loadData();
        },
        error: (err) => {
          this.handleErrors(err);
        },
      });
  }

  getCategoriesForArticle(articleName: string) {
    return this.cartPageable.content
      .filter((a) => a.name === articleName)
      .map((a) => a.categories.map((c) => ` ${c.name}`))
      .join(', ');
  }
}
