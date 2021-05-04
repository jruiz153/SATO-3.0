import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* import { CrearControlCargueComponent } from './reparto/crear-control-cargue/crear-control-cargue.component';
import { CrearPlanillaRepartoComponent } from './reparto/crear-planilla-reparto/crear-planilla-reparto.component'; */
import { MonitorRecoleccionComponent } from './monitor-recoleccion/monitor-recoleccion.component';

const routes: Routes = [
    { 
        path: '',
        children: [
            {path: 'monitor-recoleccion', component: MonitorRecoleccionComponent}
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RecoleccionRoutingModule {}