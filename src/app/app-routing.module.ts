import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
 
const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home.module').then(m => m.HomeModule), canActivate: [] },
  { path: 'teste', loadChildren: () => import('./modules/home.module').then(m => m.HomeModule), canActivate: [] },
];
 
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: false })],
})
export class AppRoutingModule {}
 