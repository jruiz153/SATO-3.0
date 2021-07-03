import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultarUsuariosComponent } from './consultar-usuarios/consultar-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: ConsultarUsuariosComponent },
    { path: 'consultar-usuarios', component: ConsultarUsuariosComponent },
    { path: 'detalle-usuario/:id', component: DetalleUsuarioComponent }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
