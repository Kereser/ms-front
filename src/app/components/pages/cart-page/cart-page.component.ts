import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { RadioButtonComponent } from '@app/components/atoms/radio-button/radio-button.component';
import { CartArticleModel } from '@app/shared/models/CartArticleModel';
import {
  CartService,
  PageCartDTO,
} from '@app/shared/services/cart/cart.service';
import { ToastService } from '@app/shared/services/toast/toast.service';
import { UserService } from '@app/shared/services/user/user.service';
import {
  Consts,
  Direcitons,
  StatusCodes,
  ToastTypes,
} from '@app/utils/Constants';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartPageable!: PageCartDTO<CartArticleModel>;
  page: number = Consts.ZERO;
  pageSize: number = Consts.ONE;
  order: Direcitons = Direcitons.ASC;
  categoryName: string | null = null;
  brandName: string | null = null;

  @ViewChildren('categoriesRadio, brandsRadio, sortRadio')
  radioButtons!: QueryList<RadioButtonComponent>;

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
    this.cartService
      .getArticlesForUser(
        this.page,
        this.pageSize,
        this.order,
        this.categoryName,
        this.brandName
      )
      .subscribe({
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

    let msg = Consts.UNEXPECTED_ERROR;
    if (clientErrorStatuses.has(ex.status)) {
      msg = ex.error?.message;
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

  getArticleCartPrice(article: CartArticleModel): string {
    return ` ${article.price * article.cartQuantity}`;
  }

  onReset(): void {
    this.radioButtons.forEach((radioButton) => radioButton.resetData());
    this.setInitialData();
    this.loadData();
  }

  getInitialCategories() {
    const categories = new Set<string>();

    this.cartPageable?.content.forEach((a) =>
      a.categories.forEach((c) => {
        categories.add(c.name);
      })
    );

    return categories;
  }

  getInitialBrands() {
    const brands = new Set<string>();

    this.cartPageable?.content.forEach((a) => brands.add(a.brand.name));

    return brands;
  }

  getSortDirections() {
    return new Set(['ASC', 'DESC']);
  }

  filterByCategory(categoryName: string) {
    this.categoryName = categoryName;
    this.page = 0;
    this.loadData();
  }

  filterByBrand(brandName: string) {
    this.brandName = brandName;
    this.page = 0;
    this.loadData();
  }

  onSortSelected(order: string) {
    this.order = order === 'ASC' ? Direcitons.ASC : Direcitons.DESC;
    this.page = 0;
    this.loadData();
  }

  setInitialData() {
    this.order = Direcitons.ASC;
    this.brandName = null;
    this.categoryName = null;
  }

  updateCurrentPage(currPage: number) {
    this.page = currPage;
    this.loadData();
  }

  handleTableSize(size: string) {
    this.pageSize = parseInt(size);
    this.page = 0;
    this.loadData();
  }
}
