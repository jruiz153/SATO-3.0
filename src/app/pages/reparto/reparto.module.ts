import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearControlCargueComponent } from './crear-control-cargue/crear-control-cargue.component';
import { CrearPlanillaRepartoComponent } from './crear-planilla-reparto/crear-planilla-reparto.component';
import { RepartoRoutingModule } from './reparto-rounting.module';
import { MaterialModule } from '../../modules/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';


@NgModule({
  declarations: [
    CrearControlCargueComponent,
    CrearPlanillaRepartoComponent
  ],
  imports: [
    CommonModule,
    RepartoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PagesModule
  ],
  exports:[
    CrearControlCargueComponent,
    CrearPlanillaRepartoComponent
  ]
})
export class RepartoModule { 
 constructor(){
   console.log('lrpm')
 }

}
