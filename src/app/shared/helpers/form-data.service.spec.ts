import { TestBed } from '@angular/core/testing';
import { FormDataService } from './form-data.service';
import { Consts, EntityFields, ValidationConfig, Validations } from '../../utils/Constants';
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

  it('should capitalize the first letter of a word', () => {
    const word = Consts.TEST;
    const capitalizedWord = service['capitalize'](word);
    expect(capitalizedWord).toBe('Test');
  });

  it('should generate form configuration with labels capitalized and values empty', () => {
    const fields: EntityFields[] = [
      { name: Consts.TEST_FIELD, type: Consts.TYPE_INPUT },
      { name: Consts.NAME, type: Consts.TYPE_SELECT }
    ];
    const generatedConfig = service['generateFormConfiguration'](fields);
    expect(generatedConfig).toEqual([
      { name: Consts.TEST_FIELD, type: Consts.TYPE_INPUT, value: Consts.EMPTY, label: Consts.TEST_FIELD_CAPI } as any,
      { name: Consts.NAME, type: Consts.TYPE_SELECT, value: Consts.EMPTY, label: Consts.NAME_CAPI } as any
    ]);
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
      { name: Consts.NAME, type: Consts.TYPE_INPUT, value: Consts.EMPTY, label: Consts.NAME_CAPI } as any,
      { name: Consts.DESCRIPTION, type: Consts.TYPE_INPUT, value: Consts.EMPTY, label: Consts.DESCRIPTION_CAPI }
    ]);
  });

  it('should return an empty array if getFormConfiguration does not find the type', () => {
    const result = service.getFormConfiguration(Consts.NON_EXISTED_TYPE);
    expect(result).toEqual([]);
  });
});
