import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoleccionService {

  private url = environment.url; //api del programa
  private url_envia = environment.url_envia; //api transversal envia

  constructor(protected http: HttpClient) { }

  consultarPlanillasRecoleccionMonitor(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }recoleccion/ConsultarPlanillasRecoleccionMonitor/`,data);
  }

  consultarOSsPlanillaRecoleccionMonitor(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }recoleccion/ConsultarOSsMonitorRecoleccion/`,data);
  }

  consultarOSsPlanillaRecoleccion(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }recoleccion/ConsultarPlanillasRecoleccionMonitor/`,data);
  }

  consultarResumenPlanillaRecoleccion(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }recoleccion/ConsultarResumenPlanillaMonitor/`,data);
  }

  
}