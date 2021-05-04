import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorRecoleccionComponent } from './monitor-recoleccion/monitor-recoleccion.component';
import { RecoleccionRoutingModule } from './recoleccion-rounting.module';
import { PagesModule } from '../pages.module';
import { MaterialModule } from 'src/app/modules/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MonitorRecoleccionComponent],
  imports: [
    CommonModule,
    RecoleccionRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PagesModule
  ],
  exports: [
    MonitorRecoleccionComponent
  ]
})
export class RecoleccionModule { }
