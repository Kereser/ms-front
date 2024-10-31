import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { UserService } from '../services/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Consts } from '@app/utils/Constants';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, LoginGuard],
    });

    guard = TestBed.inject(LoginGuard);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not active route', () => {
    jest.spyOn(userService, 'getTokenFromStorage').mockReturnValue(null);

    const res = guard.canActivate();

    expect(res).toBeTruthy();
  });

  it('should active route', () => {
    jest
      .spyOn(userService, 'getTokenFromStorage')
      .mockReturnValue(Consts.DUMMY_TOKEN);
    jest
      .spyOn(userService, 'handleRedirectionAccordingToRole')
      .mockReturnValue();

    const res = guard.canActivate();

    expect(res).toBeFalsy();
  });
});
