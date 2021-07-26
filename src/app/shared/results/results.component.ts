import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SatoService } from 'src/app/services/sato.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Guia } from '../../interfaces/guia.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  num_guia = '';
  guia: Guia;
  fotos: any[];
  cargandoFotos = false;
  guiaExiste: boolean;

  constructor(private satoS: SatoService,public tools:ToolsService, private router: ActivatedRoute) { 
    this.tools.mostrarNavbar();
    this.tools.asignarTituloOpcion('Consulta guía')

    this.router.params.subscribe(params =>{
    this.consultarGuia(params['id'])
    this.num_guia = params['id'];
    })
  }

  ngOnInit(): void {
  }

  onTabClick(event) {
    if(event.tab.textLabel == 'Fotos'){
      this.consultarFotos();
    }
  }

  consultarGuia(id: string){
    this.satoS.consultarGuia(id).subscribe(res=>{
        this.guia = res;
        this.guiaExiste = res.Cod_EstadoG ===0 ? false:true;
    })
  }

  consultarFotos(){
    this.cargandoFotos = true;
    this.satoS.consultarFotos(this.num_guia).subscribe(res=>{
      this.fotos = res;
      this.cargandoFotos = false;

      if(res.length ==0){
        this.tools.mensaje_error('No se encontrarón fotos.')
      }
    })
  }

}
