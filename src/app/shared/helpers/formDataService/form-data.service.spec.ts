import { TestBed } from '@angular/core/testing';
import { FormDataService } from './form-data.service';
import { Consts, EntityFields, FormField, ValidationConfig, Validations } from '../../../utils/Constants';
import { ValidatorFn } from '@angular/forms';

describe('FormDataService', () => {
  let service: FormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate formFields with empty initial value', () => {
    const fields: EntityFields[] = [
      { name: Consts.TEST_FIELD, type: Consts.TYPE_TEXT },
      { name: Consts.NAME, type: Consts.TYPE_SELECT }
    ];
    const generatedConfig = service['generateFormConfiguration'](fields);
    expect(generatedConfig).toEqual([
      { name: Consts.TEST_FIELD, type: Consts.TYPE_TEXT, value: Consts.EMPTY },
      { name: Consts.NAME, type: Consts.TYPE_SELECT, value: Consts.EMPTY }
    ] as FormField[]);
  });

  it('should return an empty array if generateFormConfiguration receives undefined', () => {
    const generatedConfig = service['generateFormConfiguration'](undefined);
    expect(generatedConfig).toEqual([]);
  });

  it('should return validations for a field on an entity', () => {
    const validations: ValidatorFn[] = [jest.fn(), jest.fn()];
    (Validations as any)['testEntity'] = { 'testField': validations };
    const result = service.getValidationsForFieldOnEntity('testEntity' as keyof ValidationConfig, Consts.TEST_FIELD);
    expect(result).toBe(validations);
  });

  it('should get form configuration for a given type', () => {
    const result = service.getFormConfiguration(Consts.CATEGORY);
    expect(result).toEqual([
      { name: Consts.NAME, type: Consts.TYPE_TEXT, value: Consts.EMPTY },
      { name: Consts.DESCRIPTION, type: Consts.TYPE_TEXT, value: Consts.EMPTY }
    ] as FormField[]);
  });

  it('should return an empty array if getFormConfiguration does not find the type', () => {
    const result = service.getFormConfiguration(Consts.NON_EXISTED_TYPE);
    expect(result).toEqual([]);
  });
});
