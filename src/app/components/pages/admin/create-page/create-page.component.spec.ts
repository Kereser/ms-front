import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageComponent } from './create-page.component';
import { ActivatedRoute } from '@angular/router';
import { Consts } from '../../../../utils/Constants';
import { of } from 'rxjs';

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;
  const routeMock = {
    data: of({ [Consts.TYPE]: Consts.TEST_ENTITY }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
});
