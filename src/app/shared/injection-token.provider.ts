import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const ON_SUBMIT_FORM_FN = new InjectionToken<Observable<unknown>>(
  'FORM_ACTION'
);
