import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormCreateComponent } from './form-create.component';
import { Consts } from '../../../utils/Constants';
import { TestConstants } from '../../../utils/TestConstants';

describe('FormCreateComponent', () => {
  describe('with valid route param', () => {
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
      expect(component.entityType).toBe(TestConstants.TEST_TYPE);
    });

    it('should unsubscribe from route params on destroy', () => {
      const unsubscribeSpy = jest.spyOn(component['routeSub'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('with null route param', () => {
    let component: FormCreateComponent;
    let fixture: ComponentFixture<FormCreateComponent>;
    const nullRouteStub = {
      paramMap: of({
        get: (key: string) => {
          return null;
        }
      })
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [FormCreateComponent],
        providers: [
          { provide: ActivatedRoute, useValue: nullRouteStub }
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(FormCreateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set entityType to EMPTY when route param is null', () => {
      expect(component.entityType).toBe(Consts.EMPTY);
    });
  });
});
