import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Consts, StatusCodes } from '@app/utils/Constants';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userService: UserService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string | null = localStorage.getItem(Consts.TOKEN);

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === StatusCodes.Unauthorized) {
          this.handleUnauthorized();
        }

        throw err;
      })
    );
  }

  private handleUnauthorized() {
    this.router.navigate([Consts.AUTH_LOGIN_PATH]);

    this.userService.setRoleSubToNullAtLogout();
    localStorage.removeItem(Consts.TOKEN);
  }
}
