import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Consts } from '../../../../utils/Constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '@app/shared/services/user/user.service';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let userService: UserService;
  const routeMock = {
    data: of({ [Consts.TYPE]: Consts.TEST_ENTITY }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DashboardPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    jest.spyOn(userService, 'logout');

    component.logout();

    expect(userService.logout).toHaveBeenCalledTimes(1);
  });
});
