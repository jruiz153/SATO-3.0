import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.rounting';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ResultsComponent } from './shared/results/results.component';
import { LoginComponent } from './auth/login/login.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component:  LoginComponent},
  //{ path: 'results/:id', component: ResultsComponent },
  { path: '**', component:  NopagefoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
