import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Consts } from '../../../utils/Constants';

@Component({
  selector: Consts.FORM_SELECTOR,
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit, OnDestroy {

  entityType: string = Consts.EMPTY;
  private routeSub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(param => {
      this.entityType = param.get(Consts.TYPE) || Consts.EMPTY;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
