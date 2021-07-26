import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

/* import { MaterialModule } from '../app/modules/material.modules'; */
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './shared/shared.module';
import { RecoleccionModule } from './pages/recoleccion/recoleccion.module';
import { ToolsService } from './services/tools.service';
import { UserService } from './services/user.service';
import { RepartoService } from './services/reparto.service';
import { RecoleccionService } from './services/recoleccion.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    ReactiveFormsModule,
    SharedModule,
    /* RepartoModule, * --- Estos modulos son invocdo en el routing  path: 'reparto',loadChildren: () => import(`./reparto/reparto.module`).then(m => m.RepartoModule) /
    /*RecoleccionModule,*/
/*     MaterialModule, */
    AuthModule,
    ChartsModule
  ],
  providers: [ToolsService,UserService,RepartoService,RecoleccionService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
