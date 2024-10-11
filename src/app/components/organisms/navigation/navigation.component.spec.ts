import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Constants, TestConstants, TestUtilEnums } from '../../../utils/TestConstants';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'create/brand', component: DummyComponent }, {path: 'dashboard/brand', component: DummyComponent}])],
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
    expect(createOptions.length).toBe(Constants.SIX);
    expect(createOptions[Constants.ZERO].nativeElement.textContent).toBe(TestUtilEnums.CREATE_BRAND);
    expect(createOptions[Constants.ONE].nativeElement.textContent).toBe(TestUtilEnums.CREATE_CATEGORY);
    expect(createOptions[Constants.TWO].nativeElement.textContent).toBe(TestUtilEnums.CREATE_ARTICLE);
  });

  it('should render Dashboard links', () => {
    const dashboardLink = fixture.debugElement.queryAll(By.css('.navigation__opt'))[1].nativeElement;
    expect(dashboardLink.textContent).toBe(TestConstants.capitalize(TestConstants.DASHBOARD_PATH));
  });

  it('should navigate to Create Category when the link is clicked', fakeAsync(() => {
    const location: Location = TestBed.inject(Location);
    const createCategoryLink = fixture.debugElement.query(By.css('a[href="/create/brand"]')).nativeElement;
  
    createCategoryLink.click();
    tick();
    fixture.detectChanges();     
  
    expect(location.path()).toBe('/create/brand');
  }));
  
  
  it('should navigate to Brand dashboard when the link is clicked', fakeAsync (() => {
    const location: Location = TestBed.inject(Location);
    const dashboardLink = fixture.debugElement.query(By.css('a[href="/dashboard/brand"]')).nativeElement;
    
    dashboardLink.click();
    tick();
    fixture.detectChanges(); 

    expect(location.path()).toBe('/dashboard/brand');
  }));
});
