import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NakedButtonComponent } from './naked-button.component';

describe('NakedButtonComponent', () => {
  let component: NakedButtonComponent;
  let fixture: ComponentFixture<NakedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NakedButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NakedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
