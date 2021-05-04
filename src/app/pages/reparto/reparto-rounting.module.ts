import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CrearPlanillaRepartoComponent } from './crear-planilla-reparto/crear-planilla-reparto.component';
import { CrearControlCargueComponent } from './crear-control-cargue/crear-control-cargue.component';

const routes: Routes = [
    { 
        path: '',
        children: [
            {path: '', component: CrearControlCargueComponent},
            {path: 'crear-cc', component: CrearControlCargueComponent},
            {path: 'crear-planilla-rep', component: CrearPlanillaRepartoComponent}
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RepartoRoutingModule {}