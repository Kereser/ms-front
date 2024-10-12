import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastTypes } from '../../../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<{type: ToastTypes, msg: string}>();
  toastState$ = this.toastSubject.asObservable();

  show(type: ToastTypes, msg: string) {
    this.toastSubject.next({type, msg});
  }
}
