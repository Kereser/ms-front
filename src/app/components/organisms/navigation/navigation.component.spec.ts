import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TestConstants } from '../../../utils/TestConstants';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [NavigationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Create options', () => {
    const createOptions = fixture.debugElement.queryAll(By.css('.navigation__inner-list a'));
    expect(createOptions.length).toBe(TestConstants[3]);
    expect(createOptions[TestConstants[0]].nativeElement.textContent).toBe(TestConstants.CREATE_BRAND);
    expect(createOptions[TestConstants[1]].nativeElement.textContent).toBe(TestConstants.CREATE_CATEGORY);
    expect(createOptions[TestConstants[2]].nativeElement.textContent).toBe(TestConstants.CREATE_ARTICLE);
  });

  it('should render Dashboard link', () => {
    const dashboardLink = fixture.debugElement.query(By.css('.navigation__list a.navigation__opt')).nativeElement;
    expect(dashboardLink.textContent).toBe(TestConstants.capitalize(TestConstants.DASHBOARD_PATH));
  });

  it('should navigate to Create Category when the link is clicked', async () => {
    const navigateSpy = jest.spyOn(router, TestConstants.NAVIGATE_BY_URL);
    const createCategoryLink = fixture.debugElement.queryAll(By.css('.navigation__inner-list a'))[1].nativeElement;
    createCategoryLink.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.mock.calls[TestConstants[0]][TestConstants[0]].toString()).toBe(TestConstants.CREATE_CATEGORY_PATH);
  });

  it('should navigate to Dashboard when the link is clicked', async () => {
    const navigateSpy = jest.spyOn(router, TestConstants.NAVIGATE_BY_URL);
    const dashboardLink = fixture.debugElement.query(By.css('.navigation__list a.navigation__opt')).nativeElement;
    dashboardLink.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy.mock.calls[TestConstants[0]][TestConstants[0]].toString()).toBe(TestConstants.REDIRECT_DASHBOARD_PATH);
  });
});
