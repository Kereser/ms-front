import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestConstants } from '../../../utils/TestConstants';

@Component({
  selector: 'app-button',
  template: '<button>{{ text }}</button>',
})
class MockButtonComponent {
  text: string = '';
}

@Component({
  selector: 'app-navigation',
  template: '<nav>Mock Navigation</nav>',
})
class MockNavigationComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockButtonComponent,
        MockNavigationComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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
    expect(logoElement.textContent).toBe(TestConstants.EMAZON);
  });

  it('should render the search input', () => {
    const searchContainer = fixture.debugElement.query(
      By.css('.header__search')
    ).nativeElement;
    expect(searchContainer).toBeTruthy();
  });

  it('should render the sign out button', () => {
    const buttonContainer = fixture.debugElement.query(
      By.css('.header__options')
    ).nativeElement;
    expect(buttonContainer).toBeTruthy();
  });
});
