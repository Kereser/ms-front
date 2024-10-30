import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormDataService } from '../../../shared/helpers/formDataService/form-data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Consts, StatusCodes, ToastTypes } from '../../../utils/Constants';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { FORM_ACTION } from '@app/shared/token/injection-token.provider';
import { HttpErrorResponse } from '@angular/common/http';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formDataService: FormDataService;
  let toastService: ToastService;
  const executable = jest.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: FormDataService },
        { provide: ToastService },
        {
          provide: FORM_ACTION,
          useValue: executable,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    toastService = TestBed.inject(ToastService);
    formDataService = TestBed.inject(FormDataService);
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    executable.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on entityType change', () => {
    const formFields = [
      { name: Consts.NAME, type: Consts.TYPE_INPUT, value: Consts.EMPTY },
    ];

    jest
      .spyOn(formDataService, 'getFormConfiguration')
      .mockReturnValue(formFields);
    jest
      .spyOn(formDataService, 'getValidationsForFieldOnEntity')
      .mockReturnValue([]);

    component.ngOnChanges({
      entityType: {
        currentValue: Consts.TEST_ENTITY,
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.form.contains(Consts.NAME)).toBe(Consts.TRUE);
  });

  it('should call createEntity on submit', () => {
    executable.mockReturnValue(of({}));
    jest.spyOn(formDataService, 'getFormConfiguration');
    jest.spyOn(toastService, 'show');

    component.entityType = Consts.TEST_ENTITY;
    component.form = new FormGroup({});
    component.form.addControl(
      Consts.NAME,
      component['fb'].control(Consts.TEST_ENTITY)
    );

    const formValue = { [Consts.NAME]: Consts.TEST_ENTITY };

    component.onSubmit();

    expect(executable).toHaveBeenCalledWith(formValue);
    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.SUCCESS,
      `${Consts.TEST_ENTITY} ${Consts.CREATED}`
    );
    expect(component.form.get(Consts.NAME)?.value).toBeNull();
  });

  it('should handle forbidden error on submit', () => {
    executable.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: StatusCodes.Forbidden }))
    );
    jest.spyOn(toastService, 'show');

    component.onSubmit();

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      Consts.UNAUTHORIZED_USER_ERROR
    );
  });

  it('should reset the form on submit', () => {
    executable.mockReturnValue(of({}));

    component.entityType = Consts.TEST_ENTITY;
    component.form = new FormGroup({});
    component.form.addControl(
      Consts.NAME,
      component['fb'].control(Consts.TEST_ENTITY)
    );

    component.onSubmit();

    expect(component.form.get(Consts.NAME)?.value).toBeNull();
  });

  it('should handle unexpected error on submit', () => {
    executable.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: StatusCodes.Unauthorized })
      )
    );
    jest.spyOn(toastService, 'show');

    component.onSubmit();

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      Consts.WRONG_CREDENTIALS
    );
  });

  it('should handle unexpected error on submit', () => {
    executable.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: StatusCodes.InternalServerError })
      )
    );
    jest.spyOn(toastService, 'show');

    component.onSubmit();

    expect(toastService.show).toHaveBeenCalledWith(
      ToastTypes.DANGER,
      Consts.UNEXPECTED_ERROR
    );
  });
});
