import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormDataService } from '../../../shared/helpers/formDataService/form-data.service';
import { EntityServiceFactory } from '../../../shared/helpers/entityService/EntityServiceFactory';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Consts, ToastTypes } from '../../../utils/Constants';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IEntityService } from 'src/app/shared/services/IEntityService';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formDataService: FormDataService;
  let serviceFactory: EntityServiceFactory;
  let toastService: ToastService;
  let entityServiceMock: IEntityService

  beforeEach(async () => {
    entityServiceMock = {
      createEntity: jest.fn().mockReturnValue(of({})),
      getEntityPage: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: FormDataService },
        { provide: EntityServiceFactory },
        { provide: ToastService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    toastService = TestBed.inject(ToastService);
    formDataService = TestBed.inject(FormDataService);
    serviceFactory = TestBed.inject(EntityServiceFactory);
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on entityType change', () => {
    const formFields = [
      { name: Consts.NAME, type: Consts.TYPE_INPUT, value: Consts.EMPTY }
    ];
    jest.spyOn(formDataService, 'getFormConfiguration').mockReturnValue(formFields);
    jest.spyOn(formDataService, 'getValidationsForFieldOnEntity').mockReturnValue([]);

    component.ngOnChanges({
      entityType: {
        currentValue: Consts.TEST_ENTITY,
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.form.contains(Consts.NAME)).toBe(Consts.TRUE);
  });

  it('should call createEntity on submit', () => {
    jest.spyOn(serviceFactory, 'getService').mockReturnValue(entityServiceMock);

    component.entityType = Consts.TEST_ENTITY;
    component.form = new FormGroup({});
    component.form.addControl(Consts.NAME, component['fb'].control(Consts.TEST_ENTITY));
    fixture.detectChanges();

    const formValue = { name: Consts.TEST_ENTITY };

    component.onSubmit();

    expect(serviceFactory.getService).toHaveBeenCalledWith(Consts.TEST_ENTITY);
    expect(entityServiceMock.createEntity).toHaveBeenCalledWith(formValue);
  });

  it('should handle error on submit', () => {
    const error = { message: Consts.ERROR_ON_CREATE_ENTITY };
    jest.spyOn(serviceFactory, 'getService').mockReturnValue(entityServiceMock);
    jest.spyOn(entityServiceMock, 'createEntity').mockReturnValue(throwError(() => error));
    jest.spyOn(toastService, 'show');

    component.entityType = Consts.TEST_ENTITY;
    component.form = new FormGroup({});
    component.form.addControl(Consts.NAME, component['fb'].control(Consts.TEST_ENTITY));
    
    component.onSubmit();

    expect(toastService.show).toHaveBeenCalledWith(ToastTypes.DANGER, Consts.ERROR_ON_CREATE_ENTITY);
  });

  it('should reset the form on submit', () => {
    jest.spyOn(serviceFactory, 'getService').mockReturnValue(entityServiceMock);

    component.entityType = Consts.TEST_ENTITY;
    component.form = new FormGroup({});
    component.form.addControl(Consts.NAME, component['fb'].control(Consts.TEST_ENTITY));

    component.onSubmit();

    expect(component.form.get(Consts.NAME)?.value).toBeNull();
  });
});
