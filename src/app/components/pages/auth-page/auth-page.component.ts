import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_ACTION } from '@app/shared/token/injection-token.provider';
import { UserService } from '@app/shared/services/user/user.service';
import { Consts } from '@app/utils/Constants';
import { authPageFactory } from './auth-page.provider';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  providers: [
    {
      provide: FORM_ACTION,
      useFactory: authPageFactory,
      deps: [UserService, ActivatedRoute],
    },
  ],
})
export class AuthPageComponent implements OnInit {
  authType!: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.authType = data[Consts.TYPE] ?? Consts.EMPTY;
    });
  }

  getButtonTxt(): string {
    return this.authType === Consts.LOGIN ? Consts.SING_UP : Consts.LOGIN;
  }

  switchView() {
    this.router.navigate([this.getPathOnAuth()]);
  }

  getPathOnAuth(): string {
    return this.authType === Consts.LOGIN
      ? `/auth/${Consts.SINGUP}`
      : `/auth/${Consts.LOGIN}`;
  }
}
