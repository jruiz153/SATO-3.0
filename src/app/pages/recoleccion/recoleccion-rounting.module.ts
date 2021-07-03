import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MonitorRecoleccionComponent } from './monitor-recoleccion/monitor-recoleccion.component';
import { ControlRecoleccionComponent } from './control-recoleccion/control-recoleccion.component';

const routes: Routes = [
    { 
        path: '',
        children: [
            {path: 'monitor-recoleccion', component: MonitorRecoleccionComponent},
            {path: 'control-recoleccion', component: ControlRecoleccionComponent}
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RecoleccionRoutingModule {}