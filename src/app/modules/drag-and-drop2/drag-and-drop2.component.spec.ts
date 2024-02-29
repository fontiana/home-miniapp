import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDrop2Component } from './drag-and-drop2.component';

describe('DragAndDrop2Component', () => {
  let component: DragAndDrop2Component;
  let fixture: ComponentFixture<DragAndDrop2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDrop2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDrop2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
