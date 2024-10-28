import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ON_SUBMIT_FORM_FN } from '@app/shared/injection-token.provider';
import {
  LoginForm,
  NewUserForm,
  UserService,
} from '@app/shared/services/user/user.service';
import { Consts } from '@app/utils/Constants';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  providers: [
    {
      provide: ON_SUBMIT_FORM_FN,
      useFactory: (service: UserService, route: ActivatedRoute) => {
        if (route.snapshot.data[Consts.TYPE] === Consts.LOGIN) {
          return (entity: LoginForm) => service.login(entity);
        }

        return (entity: NewUserForm) => service.signup(entity);
      },
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
    this.router.navigate([`/${this.getPathOnAuth()}`]);
  }

  getPathOnAuth(): string {
    return this.authType === Consts.LOGIN
      ? `/auth/${Consts.SINGUP}`
      : `/auth/${Consts.LOGIN}`;
  }
}
