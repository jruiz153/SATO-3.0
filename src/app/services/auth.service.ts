import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from './tools.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from '../../app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  usuario = null;
  cod_regional = null;
  cod_empleado = null;
  nom_empleado = null;
  token: string;
  UsuarioEnviaNet: string;
  menu: any[] = [];
  fecha_sistema: string = "";

  constructor(private http: HttpClient, public tools: ToolsService, private router: Router) {
    this.getUsuario();
  }

  isAuthenticated(): boolean {
    return (this.usuario != null) ? true : false;
  }

  getUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    if (this.usuario != null){
        this.cod_regional = this.usuario.Cod_Regional;
        this.cod_empleado = this.usuario.Cod_Empleado;
        this.nom_empleado = this.usuario.Nom_Empleado;
        this.UsuarioEnviaNet = this.usuario.UsuarioEnviaNet;
        this.menu = this.usuario.Modulos;
        this.fecha_sistema = "15/04/2021";
        
        let user = JSON.parse(localStorage.getItem('usuario'));
     }
     else{
        this.cod_empleado = 0;
     }
  }

  login(gtoken: string, data: any, recordar: boolean = false) {
     return this.http.post(`${ this.url }user/login/`, data).pipe(map((resp: any) => {

      if(resp.Cod_Empleado != 0){
        localStorage.setItem('token', JSON.stringify(resp.Token));
        localStorage.setItem('usuario', JSON.stringify(resp));
        localStorage.setItem('menu', JSON.stringify(resp.Modulos));

        this.nom_empleado = resp.Nom_Empleado;
      }
       
       return resp;
   }),
     catchError(err => {
       return throwError(err);
     })
   );
   }

   logout(){
     localStorage.removeItem('usuario');
     localStorage.removeItem('token');
     localStorage.removeItem('menu');
     
     delete this.usuario;
     delete this.cod_empleado;
     delete this.nom_empleado;
     delete this.UsuarioEnviaNet;
     delete this.token;

     this.router.navigate(['/login']);
   }
}

