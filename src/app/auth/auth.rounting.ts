import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from '../pages/inicio/inicio.component';

const routes: Routes = [
/*     { path: '', component: LoginComponent }, */
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    /* { path: 'inicio', component: InicioComponent }, */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}