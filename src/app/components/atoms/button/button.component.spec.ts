import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { Constants } from '../../../utils/Constants';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default type and text', () => {
    expect(component.type).toBe(Constants.BUTTON);
    expect(component.text).toBe(Constants.DEFAULT_BUTTON);
  });

  it('should render button with correct text', () => {
    component.text = 'Custom txt';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Custom txt');
  });

  it('should have correct type attribute', () => {
    component.type = 'submit';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.attributes['type']).toBe('submit');
  });

  it('should have disabled attribute if disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.getAttribute('disabled')).toBe('');
  });
});