import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  posicion_menu: 'start';
  estado_navbar = false;
  titulo_opcion: string;
  acciones: any = [];

  constructor() { 
  }

  esconderNavbar(){
    this.estado_navbar =false;
  }

  mostrarNavbar(){
    this.estado_navbar =true;
  }

  asignarTituloOpcion(texto: string) {
    this.titulo_opcion = texto;
  }

  cambiarPosicionMenu(position){
    this.posicion_menu =position;
  }

  consultarPermisosOpcion(modulo,submodulo,opcion){
    //this.acciones =position;
  }


  mensaje_ok(mensaje) {
    ($ as any).notify({
        title: '<b style=\"font-size:16px\">Mensaje</b>',
        message: '<div style=\"font-size:16px\">' +  mensaje + '</div>'
    }, {
        type: 'success',
        delay: 1000,
        placement: {
            from: 'bottom'
        }
    }
    );
  }

  mensaje_error(mensaje) {
    ($ as any).notify({
        title: '<b style=\"font-size:16px\">Error!!</b>',
        message: '<div style=\"font-size:16px\">' + mensaje + '</div>',
        newest_on_top: false
    },
    {
        type: 'danger',
        delay: 1500,
        placement: {
            from: 'bottom'
        },
    });
  } 

}

 interface jQueryStatic {
  notify: any;
}
 
