import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormTextInputComponent } from './form-text-input.component';
import { By } from '@angular/platform-browser';
import { Consts } from '../../../utils/Constants';

describe('FormTextInputComponent', () => {
  let component: FormTextInputComponent;
  let fixture: ComponentFixture<FormTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTextInputComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTextInputComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      testField: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    component.config = { name: Consts.TEST_FIELD, label: 'Test Field' };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display validation messages', () => {
    const control = component.form.get(component.config.name);
    control!.setValue('');
    control!.markAsTouched();
    fixture.detectChanges();

    const validationMessages = fixture.debugElement.queryAll(By.css(Consts.SMALL));
    expect(validationMessages.length).toBeGreaterThan(0);
  });

  it('should set form control value in the input field', () => {
    const input = fixture.debugElement.query(By.css(Consts.TYPE_INPUT)).nativeElement;
    component.form.get('testField')!.setValue(Consts.VALID_VALUE);
    fixture.detectChanges();
    expect(input.value).toBe(Consts.VALID_VALUE);
  });

  it('should display the correct label', () => {
    const label = fixture.debugElement.query(By.css(Consts.LABEL)).nativeElement;
    expect(label.textContent).toBe('Test Field');
  });
});
