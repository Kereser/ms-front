import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Consts } from '../../../../utils/Constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '@app/shared/services/user/user.service';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;
  let userService: UserService;
  let initialData = { [Consts.TYPE]: Consts.TEST_ENTITY } as unknown;
  let data$Sub = new BehaviorSubject(initialData);
  const routeMock = {
    data: data$Sub.asObservable(),
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

  it('should make empty when data not found', () => {
    data$Sub.next({});

    component.ngOnInit();

    expect(component.entityType).toBe(Consts.EMPTY);
  });
});
