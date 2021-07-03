import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reexpedidor } from '../interfaces/reexpedidor.interface';
import { Tercero } from '../interfaces/tercero.interface';
import { Vehiculo } from '../interfaces/vehiculo.interface';

@Injectable({
  providedIn: 'root'
})
export class RepartoService {
  private url = environment.url; //api del programa
  private url_envia = environment.url_envia; //api transversal envia

  constructor(protected http: HttpClient) { }

  consultarRutas(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/reparto/ConsultarRutasReparto/`,data);
  }

  consultarControlCargue(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/reparto/consultarControlCargue/`,data);
  }

  consultarGuiasControlCargue(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/reparto/consultarGuiasControlCargue/`,data);
  }

  validarGuiaControlCargue(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/reparto/ValidarControlCargue/`,data);
  }

  retirarGuiaControlCargue(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/reparto/RetirarGuiaControlCargue/`,data);
  }

  //tipos planillar
  consultarContratistas(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }/reparto/ConsultarContratistas/` + id);
  }
  
  //tipos de liquidacion contratistas tipo b
  consultarTiposLiquidacionContB(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/reparto/ConsultarTiposLiquidacionContB/`,data);
  }

  consultarReexpedidores(id: number): Observable<Reexpedidor[]>{
    return this.http.get<Reexpedidor[]>(`${ this.url }/reparto/ConsultarReexpedidores/` + id);
  }

  //tipos de liquidacion reexpedidores
  consultarTiposLiquidacionRX(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/reparto/ConsultarTiposLiquidacionRX/`,data);
  }

  consultarTerceros(id: number): Observable<Tercero[]>{
    return this.http.get<Tercero[]>(`${ this.url }/reparto/ConsultarTerceros/` + id);
  }

  ConsultarVehiculosTerceros(id: number): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`${ this.url }/reparto/ConsultarVehiculosTerceros/` + id);
  }

  ConsultarConductoresTerceros(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }/reparto/ConsultarConductoresTerceros/` + id);
  }
  
  consultarTiposLiquidacionTercero(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }/reparto/consultarTiposLiquidacionTercero/` + id);
  }
}
