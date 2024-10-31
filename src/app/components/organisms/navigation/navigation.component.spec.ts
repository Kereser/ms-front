import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TestConstants, TestUtilEnums } from '../../../utils/TestConstants';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Consts } from '../../../utils/Constants';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '@app/shared/services/user/user.service';

@Component({ template: '' })
class DummyComponent {}

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'create/brand', component: DummyComponent },
          { path: 'dashboard/brand', component: DummyComponent },
        ]),
        HttpClientTestingModule,
      ],
      providers: [UserService],
      declarations: [NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Create" options when admin logged in', () => {
    jest.spyOn(userService, 'getRoleValue').mockReturnValue(Consts.ADMIN);
    fixture.detectChanges();

    const createOptions = fixture.debugElement.queryAll(
      By.css('.navigation__inner-list a')
    );
    expect(createOptions.length).toBe(Consts.SEVEN);
    expect(createOptions[Consts.ZERO].nativeElement.textContent).toBe(
      TestUtilEnums.CREATE_BRAND
    );
    expect(createOptions[Consts.ONE].nativeElement.textContent).toBe(
      TestUtilEnums.CREATE_CATEGORY
    );
    expect(createOptions[Consts.TWO].nativeElement.textContent).toBe(
      TestUtilEnums.CREATE_ARTICLE
    );
  });

  it('should render NOT render "Create" options when aux-depot logged', () => {
    jest.spyOn(userService, 'getRoleValue').mockReturnValue(Consts.AUX_DEPOT);
    fixture.detectChanges();

    const createOptions = fixture.debugElement.queryAll(
      By.css('.navigation__inner-list a')
    );
    expect(createOptions.length).toBe(Consts.THREE);
    expect(createOptions[Consts.ZERO].nativeElement.textContent).toBe(
      Consts.BRAND_DASHBOARD
    );
    expect(createOptions[Consts.ONE].nativeElement.textContent).toBe(
      Consts.CATEGORY_DASHBOARD
    );
    expect(createOptions[Consts.TWO].nativeElement.textContent).toBe(
      Consts.ARTICLE_DASHBOARD
    );
  });

  it('should render Dashboard links', () => {
    const dashboardLink = fixture.debugElement.queryAll(
      By.css('.navigation__opt')
    )[0].nativeElement;
    expect(dashboardLink.textContent).toBe(
      TestConstants.capitalize(TestConstants.DASHBOARD_PATH)
    );
  });

  it('should navigate to Brand dashboard when the link is clicked', fakeAsync(() => {
    const location: Location = TestBed.inject(Location);
    const dashboardLink = fixture.debugElement.query(
      By.css('a[href="/dashboard/brand"]')
    ).nativeElement;

    dashboardLink.click();
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/dashboard/brand');
  }));
});
