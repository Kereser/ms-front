import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { Constants, EntityFields, FormField, ValidationConfig, Validations } from '../../../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formConfig: Map<string, Array<FormField>> = Constants.FORM_CONFIGURATIONS

  private generateFormConfiguration(fields: EntityFields[] | undefined): FormField[] {
    if (!fields) return [];

    return fields.map(field => {
      return {
        ...field,
        label: field.name,
        value: '',
      }
    });
  }

  getValidationsForFieldOnEntity(entity: keyof ValidationConfig, fieldName: string): ValidatorFn[] {
    return Validations[entity][fieldName];
  }

  getFormConfiguration(type: string): FormField[] {
    const fields = this.formConfig.get(type);
    return this.generateFormConfiguration(fields);
  }
}
