import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { PopoverStepperComponent } from './components/popover-stepper/popover-stepper/popover-stepper.component';
import { PopoverComponent } from './modules/popover-stepper/popover-stepper.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home.module').then((m) => m.HomeModule),
    canActivate: [],
  },
  {
    path: 'teste',
    loadChildren: () =>
      import('./modules/home.module').then((m) => m.HomeModule),
    canActivate: [],
  },
  {
    path: 'drag-and-drop',
    loadChildren: () =>
      import('./modules/home.module').then((m) => m.HomeModule),
    canActivate: [],
  },
  {
    path: 'personalizar',
    loadChildren: () =>
      import('./modules/home.module').then((m) => m.HomeModule),
    canActivate: [],
  },
  {
    path: 'personalizar',
    loadChildren: () =>
      import('./modules/home.module').then((m) => m.HomeModule),
    canActivate: [],
  },
  { path: 'popover', component: PopoverStepperComponent },
  { path: 'popover-two', component: PopoverComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: true }),
  ],
})
export class AppRoutingModule {}
