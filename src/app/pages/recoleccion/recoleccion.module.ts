import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorRecoleccionComponent } from './monitor-recoleccion/monitor-recoleccion.component';
import { RecoleccionRoutingModule } from './recoleccion-rounting.module';
import { PagesModule } from '../pages.module';
import { MaterialModule } from 'src/app/modules/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ControlRecoleccionComponent } from './control-recoleccion/control-recoleccion.component';
import { ChartsModule } from "ng2-charts";


@NgModule({
  declarations: [MonitorRecoleccionComponent, ControlRecoleccionComponent],
  imports: [
    //FormsModule,
    //ReactiveFormsModule,
    CommonModule,
    RecoleccionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    PagesModule
  ],
  exports: [
    MonitorRecoleccionComponent,
    ControlRecoleccionComponent
  ]
})
export class RecoleccionModule { }
