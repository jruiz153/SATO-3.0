import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespachoRoutingModule } from './despacho-routing.module';
import { CapturarGuiaComponent } from './capturar-guia/capturar-guia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material.modules';
import { SharedModule } from '../../shared/shared.module';
import { PagesModule } from '../pages.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [CapturarGuiaComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DespachoRoutingModule,
    MaterialModule,
    SharedModule,
    PagesModule
  ],
  exports: [
    CapturarGuiaComponent
  ]
})
export class DespachoModule { }
