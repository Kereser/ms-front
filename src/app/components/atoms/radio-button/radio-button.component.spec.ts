import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';
import { Consts } from '@app/utils/Constants';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change selectedValue when changes', () => {
    jest.spyOn(component['selected'], 'emit');

    component.onCheckboxChange(Consts.ANY_ROLE);

    expect(component.selected.emit).toHaveBeenCalledWith(Consts.ANY_ROLE);
  });

  it('should reset data', () => {
    component.selectedOption = Consts.NAME;

    component.resetData();

    expect(component.selectedOption).toBeNull();
  });
});
