import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/test.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PagenotfoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'googleTagManagerId', useValue: 'GTM-555555' }
  ],
  // providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
