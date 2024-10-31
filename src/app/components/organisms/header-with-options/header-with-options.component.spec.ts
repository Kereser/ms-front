import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithOptionsComponent } from './header-with-options.component';
import { By } from '@angular/platform-browser';
import { Consts } from '@app/utils/Constants';

describe('HeaderWithOptionsComponent', () => {
  let component: HeaderWithOptionsComponent;
  let fixture: ComponentFixture<HeaderWithOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderWithOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderWithOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logoElement = fixture.debugElement.query(
      By.css('.header__logo h2')
    ).nativeElement;
    expect(logoElement.textContent).toBe(Consts.EMAZON);
  });

  it('should render the search input', () => {
    const searchContainer = fixture.debugElement.query(
      By.css('.header__search')
    ).nativeElement;
    expect(searchContainer).toBeTruthy();
  });

  it('should render the sign out button', () => {
    const buttonContainer = fixture.debugElement.query(
      By.css('.header__button')
    ).nativeElement;
    expect(buttonContainer).toBeTruthy();
  });

  it('should render the navigation', () => {
    const navigationElement = fixture.debugElement.query(
      By.css('app-navigation')
    ).nativeElement;
    expect(navigationElement).toBeTruthy();
  });
});
