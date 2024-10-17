import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { Consts } from '../../../utils/Constants';

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
    expect(component.type).toBe(Consts.BUTTON);
    expect(component.text).toBe(Consts.DEFAULT_BUTTON);
  });

  it('should render button with correct text', () => {
    component.text = Consts.CUSTOM_TXT;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css(Consts.BUTTON));
    expect(buttonElement.nativeElement.textContent.trim()).toBe(Consts.CUSTOM_TXT);
  });

  it('should have correct type attribute', () => {
    component.type = Consts.SUBMIT;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css(Consts.BUTTON));
    expect(buttonElement.attributes['type']).toBe(Consts.SUBMIT);
  });

  it('should have disabled attribute if disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css(Consts.BUTTON)).nativeElement;
    expect(buttonElement.getAttribute('disabled')).toBe('');
  });
});