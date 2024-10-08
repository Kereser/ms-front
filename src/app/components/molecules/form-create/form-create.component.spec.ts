import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormCreateComponent } from './form-create.component';
import { Consts } from '../../../utils/Constants';
import { TestConstants } from 'src/app/utils/TestConstants';

describe('FormCreateComponent', () => {
  let component: FormCreateComponent;
  let fixture: ComponentFixture<FormCreateComponent>;
  const activatedRouteStub = {
    paramMap: of({
      get: (key: string) => {
        if (key === Consts.TYPE) {
          return TestConstants.TEST_TYPE;
        }
        return null;
      }
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCreateComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set entityType from route params', () => {
    expect(component.entityType).toBe('test-type');
  });

  it('should unsubscribe from route params on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['routeSub'], TestConstants.UNSUBSCRIBE);
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
