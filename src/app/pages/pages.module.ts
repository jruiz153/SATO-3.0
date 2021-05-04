import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../modules/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* import { PagesRoutingModule } from './pages.routing'; */
import { InicioComponent } from './inicio/inicio.component';
import { RepartoModule } from './reparto/reparto.module';

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent
  ],
  exports: [
    PagesComponent,
  ],
  imports: [ 
   /*  RepartoModule, este es definido en el PagesRoutingModule */
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  
 /*    PagesRoutingModule, */
  ]
})
export class PagesModule { }