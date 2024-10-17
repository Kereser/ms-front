import { TestBed } from '@angular/core/testing';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { Consts, ToastTypes } from '../../../utils/Constants';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show a success message', () => {
    service.show(ToastTypes.SUCCESS, Consts.TOAST_MESSAGE);
    service.toastState$.subscribe((toast) => {
      expect(toast).toEqual({ type: ToastTypes.SUCCESS, msg: Consts.TOAST_MESSAGE });
    });
  });

  it('should show an error message', () => {
    service.show(ToastTypes.DANGER, Consts.TOAST_MESSAGE);
    service.toastState$.subscribe((toast) => {
      expect(toast).toEqual({ type: ToastTypes.DANGER, msg: Consts.TOAST_MESSAGE });
    });
  });

  it('should emit a new toast message', () => {
    const toastSpy = jest.fn();
    service.toastState$.subscribe(toastSpy);

    service.show(ToastTypes.SUCCESS, Consts.TOAST_MESSAGE);
    expect(toastSpy).toHaveBeenCalledWith({ type: ToastTypes.SUCCESS, msg: Consts.TOAST_MESSAGE });

    service.show(ToastTypes.DANGER, Consts.TOAST_MESSAGE);
    expect(toastSpy).toHaveBeenCalledWith({ type: ToastTypes.DANGER, msg: Consts.TOAST_MESSAGE });
  });
});
