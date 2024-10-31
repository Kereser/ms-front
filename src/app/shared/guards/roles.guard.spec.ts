import { TestBed } from '@angular/core/testing';

import { RolesGuard } from './roles.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user/user.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Consts } from '@app/utils/Constants';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let userService: UserService;
  let activatedRoute: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        RolesGuard,
        {
          provide: ActivatedRouteSnapshot,
          useValue: {
            data: {},
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    });

    guard = TestBed.inject(RolesGuard);

    activatedRoute = TestBed.inject(ActivatedRouteSnapshot);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should pass role guard when role in roles', () => {
    activatedRoute.data = { roles: [Consts.ADMIN] };
    jest.spyOn(userService, 'getRoleValue').mockReturnValue(Consts.ADMIN);

    const res = guard.canActivate(activatedRoute);

    expect(res).toBeTruthy();
  });

  it('should redirect to dashboard if role not in roles', () => {
    activatedRoute.data = { roles: [Consts.AUX_DEPOT] };
    jest.spyOn(userService, 'getRoleValue').mockReturnValue(Consts.ADMIN);
    jest.spyOn(guard['router'], 'navigate');

    const res = guard.canActivate(activatedRoute);

    expect(res).toBeFalsy();
    expect(guard['router'].navigate).toHaveBeenCalledWith([
      Consts.DASHBOARD_CATEGORY_PATH,
    ]);
  });
});
