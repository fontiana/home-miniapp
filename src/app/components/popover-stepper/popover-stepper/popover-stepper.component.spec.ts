import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverStepperComponent } from './popover-stepper.component';

describe('PopoverStepperComponent', () => {
  let component: PopoverStepperComponent;
  let fixture: ComponentFixture<PopoverStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
