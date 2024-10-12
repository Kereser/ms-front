import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDataService } from '../../../shared/helpers/formDataService/form-data.service';
import { EntityServiceFactory } from '../../../shared/helpers/entityService/EntityServiceFactory';
import { Consts, FormField, ToastTypes, ValidationConfig } from '../../../utils/Constants';
import { ToastService } from '../../../shared/services/toast/toast.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
  @Input() entityType: string = '';
  form!: FormGroup;
  formFields: FormField[] = [];

  constructor(private fb: FormBuilder, 
    private formDataService: FormDataService, 
    private serviceFactory: EntityServiceFactory,
    private toastService: ToastService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entityType']) {
      this.form = this.fb.group({});
      this.onFormTypeChange(changes['entityType'].currentValue);
    }
  }

  onFormTypeChange(type: string) {
    this.formFields = this.formDataService.getFormConfiguration(type);
    
    this.formFields.forEach(field => {
      const validators = this.formDataService.getValidationsForFieldOnEntity(type as keyof ValidationConfig, field.name);
      this.form.addControl(field.name, this.fb.control(field.value || '', validators));
    });
  }

  onSubmit() {
    const service = this.serviceFactory.getService(this.entityType);

    service.createEntity(this.form.value).subscribe({
      next: () => {
        this.toastService.show(ToastTypes.SUCCESS, this.entityType + ' ' + Consts.CREATED)
      },
      error: (ex) => {
        this.toastService.show(ToastTypes.DANGER, ex.error.message);
      }
    });

    this.resetFields();
  }

  private resetFields() {
    this.form.reset();
  }
}
