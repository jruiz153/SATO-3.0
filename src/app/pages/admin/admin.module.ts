import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ConsultarUsuariosComponent } from './consultar-usuarios/consultar-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.modules';
import { PagesModule } from '../pages.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';


@NgModule({
  declarations: [ConsultarUsuariosComponent, DetalleUsuarioComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    PagesModule
  ],
  exports:[
    ConsultarUsuariosComponent,
    DetalleUsuarioComponent
  ]
})
export class AdminModule { }
