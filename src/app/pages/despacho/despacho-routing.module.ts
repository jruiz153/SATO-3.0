import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapturarGuiaComponent } from './capturar-guia/capturar-guia.component';

const routes: Routes = [
  {
  path: '', 
      children: [
        { path: '', component: CapturarGuiaComponent},
        { path: 'capturar-guia', component: CapturarGuiaComponent, data:{ titulo: 'Capturar guía' } },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespachoRoutingModule { }
