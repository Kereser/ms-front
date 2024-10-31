import { UserService } from '@app/shared/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '@app/utils/Constants';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { authPageFactory } from './auth-page.provider';

describe('authPageFactory', () => {
  let userService: UserService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    route = {
      snapshot: {
        data: {},
      },
    } as unknown as ActivatedRoute;
  });

  it('should login when path is login type', () => {
    jest.spyOn(userService, 'login');
    route.snapshot.data[Consts.TYPE] = Consts.LOGIN;
    const entity = {} as any;

    const factory = authPageFactory(userService, route);

    factory(entity);

    expect(userService.login).toHaveBeenCalledWith(entity);
  });

  it('should sign up when path is sign up', () => {
    jest.spyOn(userService, 'signup');
    route.snapshot.data[Consts.TYPE] = Consts.SING_UP;
    const entity = {} as any;

    const factory = authPageFactory(userService, route);

    factory(entity);

    expect(userService.signup).toHaveBeenCalledWith(entity);
  });
});
