import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { Consts } from '@app/utils/Constants';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routeRoles: string[] = route.data['roles'];
    const currentRole = this.userService.getRoleValue();

    if (!this.userService.getTokenFromStorage()) {
      this.router.navigate([Consts.AUTH_LOGIN_PATH]);
      return false;
    }

    if (
      currentRole &&
      (routeRoles.includes(currentRole) || currentRole === Consts.ANY_ROLE)
    ) {
      return true;
    }

    this.router.navigate([Consts.DASHBOARD_CATEGORY_PATH]);
    return false;
  }
}
