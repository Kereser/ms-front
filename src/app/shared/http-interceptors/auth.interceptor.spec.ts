import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from '../services/user/user.service';
import { Consts } from '@app/utils/Constants';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AuthInterceptor', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient; // use to trigger the event, like doing interceptor.intercept();
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        UserService,
        { provide: Router, useValue: { navigate: jest.fn() } },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if token exists', () => {
    localStorage.setItem(Consts.TOKEN, Consts.DUMMY_TOKEN);

    httpClient.get('/test').subscribe();
    const httpRequest = httpMock.expectOne('/test');

    expect(httpRequest.request.headers.get('Authorization')).toBe(
      `Bearer ${Consts.DUMMY_TOKEN}`
    );
  });

  it('should not add Authorization header if no token exists', () => {
    localStorage.removeItem(Consts.TOKEN);

    httpClient.get('/test').subscribe();
    const httpRequest = httpMock.expectOne('/test');

    expect(httpRequest.request.headers.has('Authorization')).toBe(false);
  });

  it('should handle 401 error by redirecting and clearing token', (done) => {
    jest.spyOn(router, 'navigate');
    jest.spyOn(userService, 'setRoleSubToNullAtLogout');

    httpClient.get('/test').subscribe({
      error: () => {
        expect(router.navigate).toHaveBeenCalledWith([Consts.AUTH_LOGIN_PATH]);
        expect(userService.setRoleSubToNullAtLogout).toHaveBeenCalled();
        expect(localStorage.getItem(Consts.TOKEN)).toBeNull();

        done();
      },
    });

    const httpRequest = httpMock.expectOne('/test');
    httpRequest.flush(null, { status: 401, statusText: 'Unauthorized' });
  });
});
