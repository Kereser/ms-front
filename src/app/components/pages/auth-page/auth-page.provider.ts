import { ActivatedRoute } from '@angular/router';
import {
  LoginForm,
  NewUserForm,
  UserService,
} from '@app/shared/services/user/user.service';
import { Consts } from '@app/utils/Constants';

export const authPageFactory = (
  service: UserService,
  route: ActivatedRoute
) => {
  if (route.snapshot.data[Consts.TYPE] === Consts.LOGIN) {
    return (entity: LoginForm) => service.login(entity);
  }

  return (entity: NewUserForm) => service.signup(entity);
};
