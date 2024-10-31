import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageComponent } from './create-page.component';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '../../../../utils/Constants';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;
  const routeMock = {
    data: of({ [Consts.TYPE]: Consts.TEST_ENTITY }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CreatePageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePageComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout on button click', () => {
    jest.spyOn(component, 'logout');

    const buttonDebugElement = fixture.debugElement.query(
      By.css('app-button[button]')
    );

    buttonDebugElement.triggerEventHandler('click', null);

    expect(component.logout).toHaveBeenCalled();
  });
});
