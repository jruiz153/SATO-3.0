import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehiculo } from '../interfaces/vehiculo.interface';
import { Oficina } from '../interfaces/oficina.interface';

@Injectable({
  providedIn: 'root'
})
export class SatoService {
  private url = environment.url; //api del programa
  private url_envia = environment.url_envia; //api transversal envia

  constructor(protected http: HttpClient) { }

  consultarRegionales(): Observable<any>{
    return this.http.get<any>(`${ this.url }/sato/consultarregionales/`);
  }

  consultarServicios(): Observable<any>{
    return this.http.get<any>(`${ this.url }/sato/consultarservicios/`);
  }

  consultarFormasPago(): Observable<any>{
    return this.http.get<any>(`${ this.url }/sato/consultarformaspago/`);
  }

  consultarGuia(guia) : Observable<any>{
    return this.http.get<any>(`${ this.url }/sato/consultarguia/` + guia);
  }

  consultarCiudadesLetra(id: string): Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }/sato/ConsultarCiudadesLetra/${ id }`);
  }

  consultarConductores(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/sato/ConsultarConductores/`,data);
  }

  consultarOperadores(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/sato/ConsultarOperadoresLetra/`,data);
  }

  consultarReporteGerencialMT(data){
    return this.http.post(`${ this.url }/sato/ConsultarReporteGerencialMT/`,data);
  }
  
  consultarZonasLogisticas(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }/sato/ConsultarZonasLogisticas/` + id);
  }

  consultarFrentes(data): Observable<any[]>{
    return this.http.post<any[]>(`${ this.url }/sato/ConsultarFrentes/` , data);
  }

  // **************** transversales ******************
  consultarOficinas(data) : Observable<Oficina[]>{
    return this.http.post<Oficina[]>(`${ this.url }/sato/consultarOficinas/`,data);
  }

  consultarFotos(guia) : Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }/sato/consultarfotos/` + guia);
  }

  consultarVehiculo(placa) : Observable<Vehiculo>{
    return this.http.get<Vehiculo>(`${ this.url }/sato/ConsultarVehiculo/` + placa);
  }
}
