import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CrearPlanillaRepartoComponent } from './crear-planilla-reparto/crear-planilla-reparto.component';
import { CrearControlCargueComponent } from './crear-control-cargue/crear-control-cargue.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
    { 
        path: '',
        children: [
            {path: '', component: CrearControlCargueComponent, data:{ titulo: 'Crear control de cargue'}},
            {path: 'crear-cc', component: CrearControlCargueComponent , data:{ titulo: 'Crear control de cargue' }},
            {path: 'crear-planilla-rep', component: CrearPlanillaRepartoComponent, data:{ titulo: 'Crear planilla de reparto' }, canActivate: [ AuthGuard ]}
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RepartoRoutingModule {}