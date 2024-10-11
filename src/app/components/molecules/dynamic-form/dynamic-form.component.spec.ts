import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormDataService } from '../../../shared/helpers/formDataService/form-data.service';
import { EntityServiceFactory } from '../../../shared/helpers/entityService/EntityServiceFactory';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Consts } from '../../../utils/Constants';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formDataServiceMock: any;
  let entityServiceFactoryMock: any;
  let entityServiceMock: any;

  beforeEach(async () => {
    formDataServiceMock = {
      getFormConfiguration: jest.fn(),
      getValidationsForFieldOnEntity: jest.fn()
    };

    entityServiceMock = {
      createEntity: jest.fn().mockReturnValue(of({}))
    };

    entityServiceFactoryMock = {
      getService: jest.fn().mockReturnValue(entityServiceMock)
    };

    await TestBed.configureTestingModule({
      declarations: [ DynamicFormComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: FormDataService, useValue: formDataServiceMock },
        { provide: EntityServiceFactory, useValue: entityServiceFactoryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on entityType change', () => {
    const formFields = [
      { name: Consts.NAME, type: Consts.TYPE_INPUT, value: Consts.EMPTY }
    ];
    formDataServiceMock.getFormConfiguration.mockReturnValue(formFields);
    formDataServiceMock.getValidationsForFieldOnEntity.mockReturnValue([]);
    
    component.ngOnChanges({
      entityType: {
        currentValue: Consts.TEST_ENTITY,
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true
      }
    });

    fixture.detectChanges();

    expect(component.form.contains(Consts.NAME)).toBe(true);
  });

  it('should call createEntity on submit', () => {
    component.entityType = Consts.TEST_ENTITY;
    component.form = new FormGroup({});
    component.formFields = [
      { name: Consts.NAME, type: Consts.TYPE_INPUT, value: Consts.EMPTY }
    ];
    component.form.addControl(Consts.NAME, component['fb'].control('Test Name'));
    fixture.detectChanges();
  
    const formValue = { name: 'Test Name' };
  
    component.onSubmit();
  
    expect(entityServiceFactoryMock.getService).toHaveBeenCalledWith(Consts.TEST_ENTITY);
    expect(entityServiceMock.createEntity).toHaveBeenCalledWith(formValue);
  });
  

  it('should handle error on submit', () => {
    const error = new Error('An error has occurred.');
    entityServiceMock.createEntity.mockReturnValue(throwError(() => error));
    console.log = jest.fn();

    component.entityType = Consts.TEST_ENTITY;
    component.form = new FormGroup({});
    component.formFields = [
      { name: Consts.NAME, type: Consts.TYPE_INPUT, value: Consts.EMPTY }
    ];
    component.form.addControl(Consts.NAME, component['fb'].control('Test Name'));
    fixture.detectChanges();

    component.onSubmit();

    expect(console.log).toHaveBeenCalledWith('An error was found while processing createEntity');
  });

  it('should reset the form on submit', () => {
    component.entityType = Consts.TEST_ENTITY;
    component.form = new FormGroup({});
    component.formFields = [
      { name: Consts.NAME, type: Consts.TYPE_INPUT, value: Consts.EMPTY }
    ];
    component.form.addControl(Consts.NAME, component['fb'].control('Test Name'));
    fixture.detectChanges();

    component.onSubmit();

    expect(component.form.get(Consts.NAME)?.value).toBeNull();
  });
});
