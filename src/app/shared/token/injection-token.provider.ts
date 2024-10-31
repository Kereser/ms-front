import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PageableType } from '../models/PageableType';

export const FORM_ACTION = new InjectionToken<Observable<unknown>>(
  'FORM_ACTION'
);

export const TABLE_ACTTION = new InjectionToken<Observable<PageableType>>(
  'TABLE_ACTION'
);
