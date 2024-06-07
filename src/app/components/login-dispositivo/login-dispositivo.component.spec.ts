import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDispositivoComponent } from './login-dispositivo.component';

describe('LoginDispositivoComponent', () => {
  let component: LoginDispositivoComponent;
  let fixture: ComponentFixture<LoginDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDispositivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
