import { Component, OnDestroy, OnInit } from '@angular/core';
import { Consts } from '../../../../utils/Constants';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FORM_ACTION } from '../../../../shared/token/injection-token.provider';
import { createPageFactoryProvider } from './create-page.provider';
import { CategoryService } from '@app/shared/services/Category/CategoryService';
import { BrandService } from '@app/shared/services/Brand/BrandService';
import { ArticleService } from '@app/shared/services/Article/ArticleService';
import { UserService } from '@app/shared/services/user/user.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  providers: [
    {
      provide: FORM_ACTION,
      useFactory: createPageFactoryProvider,
      deps: [
        UserService,
        CategoryService,
        BrandService,
        ArticleService,
        ActivatedRoute,
      ],
    },
  ],
})
export class CreatePageComponent implements OnInit, OnDestroy {
  entityType: string = Consts.EMPTY;
  private routeSub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, public userService: UserService) {}

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
