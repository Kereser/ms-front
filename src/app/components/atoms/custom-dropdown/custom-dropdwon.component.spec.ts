import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomDropdownComponent } from './custom-dropdown.component';
import { By } from '@angular/platform-browser';
import { TestUtilEnums } from '../../../utils/TestConstants';

describe('CustomDropdownComponent', () => {
  let component: CustomDropdownComponent;
  let fixture: ComponentFixture<CustomDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDropdownComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.optionList = [TestUtilEnums.OPTION_1, TestUtilEnums.OPTION_2, TestUtilEnums.OPTION_3];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize selectedOption with the first option from the list', () => {
    component.optionList = [TestUtilEnums.OPTION_1, TestUtilEnums.OPTION_2, TestUtilEnums.OPTION_3];
    fixture.detectChanges();
    expect(component.selectedOption).toBe(TestUtilEnums.OPTION_1);
  });

  it('should toggle dropdownOpen when toggleDropdown is called', () => {
    expect(component.dropdownOpen).toBe(false);
    component.toggleDropdown();
    expect(component.dropdownOpen).toBe(true);
    component.toggleDropdown();
    expect(component.dropdownOpen).toBe(false);
  });

  it('should select an option, close the dropdown, and emit the optionSelected event when selectOption is called', () => {
    jest.spyOn(component.optionSelected, TestUtilEnums.EMIT);
    const event = new Event(TestUtilEnums.CLICK);
    component.selectOption(TestUtilEnums.OPTION_2, event);
    expect(component.selectedOption).toBe(TestUtilEnums.OPTION_2);
    expect(component.dropdownOpen).toBe(false);
    expect(component.optionSelected.emit).toHaveBeenCalledWith(TestUtilEnums.OPTION_2);
  });

  it('should close the dropdown when clicking outside', () => {
    component.dropdownOpen = true;
    const event = new Event(TestUtilEnums.CLICK);
    Object.defineProperty(event, 'target', { value: document.createElement('div') });
    component.onClickOutside(event);
    expect(component.dropdownOpen).toBe(false);
  });

  it('should select an option, close the dropdown, emit the optionSelected event, and stop event propagation', () => {
    jest.spyOn(component.optionSelected, TestUtilEnums.EMIT);
    const event = new Event(TestUtilEnums.CLICK);
    jest.spyOn(event, 'stopPropagation');

    component.selectOption(TestUtilEnums.OPTION_2, event);

    expect(component.selectedOption).toBe(TestUtilEnums.OPTION_2);
    expect(component.dropdownOpen).toBe(false);
    expect(component.optionSelected.emit).toHaveBeenCalledWith(TestUtilEnums.OPTION_2);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should not close the dropdown when clicking inside', () => {
    component.dropdownOpen = true;
    const event = new Event(TestUtilEnums.CLICK);
    const insideElement = fixture.debugElement.query(By.css('.dropdown')).nativeElement;
    Object.defineProperty(event, 'target', { value: insideElement });
    component.onClickOutside(event);
    expect(component.dropdownOpen).toBe(true);
  });
});
