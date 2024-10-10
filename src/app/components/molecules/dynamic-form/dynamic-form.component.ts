import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/shared/helpers/form-data.service';
import { EntityServiceFactory } from 'src/app/shared/helpers/EntityServiceFactory';
import { FormField, ValidationConfig, ValidationRules } from 'src/app/utils/Constants';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
  @Input() entityType: string = '';
  form!: FormGroup;
  formFields: FormField[] = [];

  constructor(private fb: FormBuilder, private formDataService: FormDataService, private serviceFactory: EntityServiceFactory) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entityType']) {
      this.form = this.fb.group({});
      this.onFormTypeChange(changes['entityType'].currentValue);
    }
    console.log('renderizo con type', this.entityType);
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
    console.log(this.form.value);

    service.createEntity(this.form.value).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log("An error has ocurred.");
      }
    });

    this.resetFields();
  }

  private resetFields() {
    this.form.reset();
  }
}
