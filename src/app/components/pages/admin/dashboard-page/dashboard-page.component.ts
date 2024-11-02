import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Consts } from '../../../../utils/Constants';
import { UserService } from '@app/shared/services/user/user.service';
import { TABLE_ACTTION } from '@app/shared/token/injection-token.provider';
import { dashboardPageFactory } from './dashboard-page.provider';
import { CategoryService } from '@app/shared/services/Category/CategoryService';
import { BrandService } from '@app/shared/services/Brand/BrandService';
import { ArticleService } from '@app/shared/services/Article/ArticleService';

const headersByType: any = {
  article: ['name', 'description', 'price', 'quantity', 'categories', 'brand'],
  brand: ['name', 'description'],
  category: ['name', 'description'],
};

const clickeableHeadersByType: any = {
  article: ['name', 'categories', 'description'],
  brand: ['name'],
  category: ['name'],
};

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [
    {
      provide: TABLE_ACTTION,
      useFactory: dashboardPageFactory,
      deps: [ActivatedRoute, CategoryService, BrandService, ArticleService],
    },
  ],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  entityType: string = Consts.EMPTY;
  private routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.entityType = data[Consts.TYPE] ?? Consts.EMPTY;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  logout() {
    this.userService.logout();
  }
}
