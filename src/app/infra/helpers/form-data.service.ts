import { Injectable } from '@angular/core';
import { Constants, FormField } from 'src/app/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formConfig: Map<string, Array<FormField>> = Constants.FORM_CONFIGURATIONS

  private generateFormConfiguration(fields: FormField[] | undefined): any[] {
    if (!fields) return []; 
    return fields.map(field => ({
      ...field,
      label: this.capitalize(field.name),
      value: ''
    }));
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getFormConfiguration(type: string): FormField[] {
    const fields = this.formConfig.get(type);
    return this.generateFormConfiguration(fields);
  }
}
