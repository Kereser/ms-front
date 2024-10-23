import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Consts } from '../../../../utils/Constants';

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
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  entityHeaders!: string[];
  clickableHeaders!: string[];
  entityType: string = Consts.EMPTY;
  private routeSub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.entityType = data[Consts.TYPE] ?? Consts.EMPTY;
      this.entityHeaders = headersByType[this.entityType];
      this.clickableHeaders = clickeableHeadersByType[this.entityType];
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
