import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomIconComponent } from './atom-icon.component';

describe('AtomIconComponent', () => {
  let component: AtomIconComponent;
  let fixture: ComponentFixture<AtomIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtomIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
