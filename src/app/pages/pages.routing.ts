import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    { path: 'main', component:PagesComponent,
      children: [
          {
            path: 'reparto',loadChildren: () => import(`./reparto/reparto.module`).then(m => m.RepartoModule) 
          },
          { 
            path: 'recoleccion',loadChildren: () => import(`./recoleccion/recoleccion.module`).then(m => m.RecoleccionModule) 
          },
          { 
            path: 'despacho',loadChildren: () => import(`./despacho/despacho.module`).then(m => m.DespachoModule) 
          },
          { 
            path: 'admin',loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule) 
          }
      ]
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}