import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestComponent } from "./test/test.component";
 
const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home.module').then(m => m.HomeModule), canActivate: [] },
  { path: 'teste', loadChildren: () => import('./modules/home.module').then(m => m.HomeModule), canActivate: [] },
  { path: 'teste2', component: TestComponent }, 
];
 
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: false })],
})
export class AppRoutingModule {}
 