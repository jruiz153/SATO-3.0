import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private url = environment.url; //api del programa
    private url_envia = environment.url_envia; //api transversal envia
    acciones_s: any=[];
  
    constructor(protected http: HttpClient) { }

    consultarPermisosAcciones(acciones){
      this.acciones_s =acciones;
    }
  
    consultarUsuarios(data): Observable<any>{
      return this.http.post<any>(`${ this.url }user/consultarusuariossato/`,data);
    }

    consultarDetalleUsuario(data): Observable<any>{
        return this.http.post<any>(`${ this.url }user/ConsultarDetalleUsuarioSATO/`,data);
    }

    consultarOpcionesUsuario(id): Observable<any>{
        return this.http.get<any>(`${ this.url }user/ConsultarOpcionesUsuario/` + id);
    }

    consultarAccionesOpcion(data): Observable<any>{
        return this.http.post<any>(`${ this.url }user/ConsultarAccionesOpcion/`, data);
    }

    consultarAccionesOpcionUsuario(data): Observable<any>{
      return this.http.post<any>(`${ this.url }user/ConsultarAccionesOpcionUsuario/`, data);
    }
  }