import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '@app/utils/Constants';
import { of } from 'rxjs';
import { SharedModule } from '@app/shared/shared.module';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  const routeMock = {
    data: of({ [Consts.TYPE]: Consts.TEST_ENTITY }),
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

    expect(txt).toBe(Consts.AUTH_LOGIN_PATH);
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
