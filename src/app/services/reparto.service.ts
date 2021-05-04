import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
