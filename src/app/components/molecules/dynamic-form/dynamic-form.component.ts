import {
  Component,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDataService } from '@app/shared/helpers/formDataService/form-data.service';
import {
  Consts,
  FormField,
  OnChangesType,
  StatusCodes,
  ToastTypes,
  ValidationConfig,
} from '@app/utils/Constants';
import { ToastService } from '@app/shared/services/toast/toast.service';
import { FORM_ACTION } from '@app/shared/token/injection-token.provider';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges {
  @Input() entityType: string = '';
  form!: FormGroup;
  formFields: FormField[] = [];

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private toastService: ToastService,
    @Inject(FORM_ACTION)
    private executable: (entity: any) => Observable<unknown>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[OnChangesType.ENTITY_TYPE]) {
      this.form = this.fb.group({});
      this.onFormTypeChange(changes[OnChangesType.ENTITY_TYPE].currentValue);
    }
  }

  onFormTypeChange(type: string) {
    this.formFields = this.formDataService.getFormConfiguration(type);

    this.formFields.forEach((field) => {
      const validators = this.formDataService.getValidationsForFieldOnEntity(
        type as keyof ValidationConfig,
        field.name
      );
      this.form.addControl(
        field.name,
        this.fb.control(field.value ?? '', validators)
      );
    });
  }

  onSubmit() {
    const trimmedValues = this.trimFormValues(this.form?.value);

    this.executable(trimmedValues).subscribe({
      next: () => {
        this.toastService.show(
          ToastTypes.SUCCESS,
          `${this.entityType} ${Consts.CREATED}`
        );
        this.resetFields();
      },
      error: (ex: HttpErrorResponse) => {
        console.log('entro con error: ', ex);

        this.handleError(ex);
      },
    });
  }

  private handleError(ex: HttpErrorResponse): void {
    let msg = 'Unexpected error';
    if (ex.status === StatusCodes.Unauthorized) {
      msg = 'Wrong Credentials';
    } else if (ex.status === StatusCodes.Forbidden) {
      msg = 'U dont have the role to perform this action.';
    }

    this.toastService.show(ToastTypes.DANGER, msg);
  }

  private trimFormValues(formValue: any): any {
    const trimmedValues: any = {};
    for (const key in formValue) {
      trimmedValues[key] = formValue[key].trim();
    }
    return trimmedValues;
  }

  private resetFields() {
    this.form.reset();
  }
}
