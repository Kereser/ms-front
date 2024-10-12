import { TestBed } from '@angular/core/testing';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { ToastTypes } from '../../../utils/Constants';

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
    service.show(ToastTypes.SUCCESS, 'Success message');
    service.toastState$.subscribe((toast) => {
      expect(toast).toEqual({ type: ToastTypes.SUCCESS, msg: 'Success message' });
    });
  });

  it('should show an error message', () => {
    service.show(ToastTypes.DANGER, 'Error message');
    service.toastState$.subscribe((toast) => {
      expect(toast).toEqual({ type: ToastTypes.DANGER, msg: 'Error message' });
    });
  });

  it('should emit a new toast message', () => {
    const toastSpy = jest.fn();
    service.toastState$.subscribe(toastSpy);

    service.show(ToastTypes.SUCCESS, 'First message');
    expect(toastSpy).toHaveBeenCalledWith({ type: ToastTypes.SUCCESS, msg: 'First message' });

    service.show(ToastTypes.DANGER, 'Second message');
    expect(toastSpy).toHaveBeenCalledWith({ type: ToastTypes.DANGER, msg: 'Second message' });
  });
});
