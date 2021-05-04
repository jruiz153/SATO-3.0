import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearPlanillaRepartoComponent } from './reparto/crear-planilla-reparto/crear-planilla-reparto.component';
import { CrearControlCargueComponent } from './reparto/crear-control-cargue/crear-control-cargue.component';

const routes: Routes = [
    /* { path: 'main', component:PagesComponent,
      children: [
          {path: 'crear-planilla-rep', component: CrearPlanillaRepartoComponent},
          {path: 'crear-cc', component: CrearControlCargueComponent}
      ]
    }, */

    { path: 'main', component:PagesComponent,
      children: [
          {
            path: 'reparto', 
            loadChildren: () => import(`./reparto/reparto.module`).then(m => m.RepartoModule) 
          },
          { 
            path: 'recoleccion', 
            loadChildren: () => import(`./recoleccion/recoleccion.module`).then(m => m.RecoleccionModule) 
    
        }
      ]
    },
    
    /*{ 
        path: 'recoleccion', 
        loadChildren: () => import(`./recoleccion/recoleccion.module`).then(m => m.RecoleccionModule) 

    },
    { 
        path: 'reparto', 
        loadChildren: () => import(`./reparto/reparto.module`).then(m => m.RepartoModule) 

    }*/
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}