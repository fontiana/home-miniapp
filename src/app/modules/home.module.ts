import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DragAndDrop2Component } from './drag-and-drop2/drag-and-drop2.component';
import { PersonalizarComponent } from './personalizar/personalizar.component';
import { A11yPipeButtonLabel } from './personalizar/a11y-button-label.pipe';
import { IconComponent } from './personalizar/atom-icon/atom-icon.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PopoverComponent } from './popover-stepper/popover-stepper.component';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'drag-and-drop', component: DragAndDrop2Component },
  { path: 'personalizar', component: PersonalizarComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    DragAndDrop2Component,
    PersonalizarComponent,
    A11yPipeButtonLabel,
    IconComponent,
    PopoverComponent,
    CarouselComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
})
export class HomeModule {}
