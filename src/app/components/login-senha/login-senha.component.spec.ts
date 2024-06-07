import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSenhaComponent } from './login-senha.component';

describe('LoginSenhaComponent', () => {
  let component: LoginSenhaComponent;
  let fixture: ComponentFixture<LoginSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSenhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
