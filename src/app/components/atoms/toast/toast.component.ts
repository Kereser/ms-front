import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { ToastTypes } from 'src/app/utils/Constants';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  msg = '';
  type!: ToastTypes;
  show = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState$.subscribe(toast => {
      this.msg = toast.msg;
      this.type = toast.type;
      this.show = true;

      setTimeout(() => (this.show = false), 3000);
    });
  }

}
