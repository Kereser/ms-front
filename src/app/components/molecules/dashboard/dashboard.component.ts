import { Component, OnInit } from '@angular/core';;
import { Subscription } from 'rxjs';
import { Consts } from '../../../utils/Constants';
import { ActivatedRoute } from '@angular/router';

const headersByType: any = {
  'article': ['name',
    'description', 
    'price', 
    'quantity',
    'categories', 
    'brand'
  ],
  'brand': ['name', 'description'],
  'category': ['name', 'description'],
}

const clickeableHeadersByType: any = {
  'article': ['name', 'categories', 'description'],
  'brand': ['name'],
  'category': ['name'],
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  entityHeaders!: string[];
  clickableHeaders!: string[];
  entityType: string = Consts.EMPTY;
  private routeSub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(param => {
      this.entityType = param.get(Consts.TYPE) ?? Consts.EMPTY;
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
