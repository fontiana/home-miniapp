import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/test.component';
import { PopoverStepperComponent } from './components/popover-stepper/popover-stepper/popover-stepper.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginSenhaComponent } from './components/login-senha/login-senha.component';
import { LoginDispositivoComponent } from './components/login-dispositivo/login-dispositivo.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PopoverStepperComponent,
    LoginComponent,
    LoginSenhaComponent,
    LoginDispositivoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  // providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
