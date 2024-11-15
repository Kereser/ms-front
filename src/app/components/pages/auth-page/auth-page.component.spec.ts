import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '@app/utils/Constants';
import { SharedModule } from '@app/shared/shared.module';
import { BehaviorSubject } from 'rxjs';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  const initialData = { [Consts.TYPE]: Consts.TEST_ENTITY } as unknown;
  let data$Sub = new BehaviorSubject(initialData);
  const routeMock = {
    data: data$Sub.asObservable(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AuthPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeMock,
        },
        SharedModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct button txt', () => {
    component.authType = Consts.LOGIN;

    const txt = component.getButtonTxt();

    expect(txt).toBe(Consts.SING_UP);
  });

  it('should navigate to exact path', () => {
    component.authType = Consts.SING_UP;

    const txt = component.getPathOnAuth();

    expect(component.authType);
    expect(txt).toBe(Consts.AUTH_LOGIN_PATH);
  });

  it('should change entityType value to empty', () => {
    data$Sub.next({});

    component.ngOnInit();

    expect(component.authType).toBe(Consts.EMPTY);
  });

  it('should navigate to exact path', () => {
    jest.spyOn(component['router'], 'navigate');

    component.authType = Consts.SING_UP;
    component.switchView();

    expect(component['router'].navigate).toHaveBeenCalledWith([
      Consts.AUTH_LOGIN_PATH,
    ]);
  });
});
