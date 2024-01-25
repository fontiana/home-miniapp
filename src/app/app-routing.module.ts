import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestComponent } from "./test/test.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home.module').then(m => m.HomeModule), canActivate: [] },
  { path: 'teste', loadChildren: () => import('./modules/home.module').then(m => m.HomeModule), canActivate: [] },
  { path: 'teste2', component: TestComponent },
  //Wild Card Route for 404 request 
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],
})
export class AppRoutingModule { }
