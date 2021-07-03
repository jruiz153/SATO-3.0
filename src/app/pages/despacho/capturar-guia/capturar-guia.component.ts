import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToolsService } from '../../../services/tools.service';
import { SatoService } from '../../../services/sato.service';

@Component({
  selector: 'app-capturar-guia',
  templateUrl: './capturar-guia.component.html',
  styleUrls: ['./capturar-guia.component.css']
})
export class CapturarGuiaComponent implements OnInit {
  forma: FormGroup;
  
  formasPago: any = [];
  servicios: any = [];
  acciones: any = [];

  objetoCiudadOrigenLlega: any;
  codCiudadO: number;
  ciudadO: string;

  objetoCiudadDestinoLlega: any;
  codCiudadD: number;
  ciudadD: string;

  isLiquidando = false;
  isGenerando = false;
  isGenerandoGuias = false;
  
  constructor(private tools: ToolsService,private satoS: SatoService, private fb: FormBuilder) {
    this.construirFormulario();
   }

  construirFormulario(){
    this.forma = this.fb.group({
      txtCuenta: [],
      hdfError: [''],
      hdfCodDescription: [''],
      txtNumCliente: [''],
      txtCodRegional: [''],
      txtCodFormaPago: [''],
      txtConsGuiasU: [''],
      drpFormaPago: [''],
      drpServicio: [''],
    })
  }

  ngOnInit(): void {
    this.tools.asignarTituloOpcion('Capturar guia')
    this.tools.mostrarNavbar();

    this.consultarFormasPago();
    this.consultarServicios();
  }

  consultarFormasPago(){
    this.satoS.consultarFormasPago().subscribe(res=>{
      this.formasPago = res;
    })
  }

  consultarServicios(){
    this.satoS.consultarServicios().subscribe(res=>{
      this.servicios = res;
    })
  }

  recibirCiudadOrigen(objeto: any){
    this.objetoCiudadOrigenLlega = objeto;
    this.codCiudadO = objeto.Cod_Ciudad;
    this.ciudadO = objeto.Nom_Ciudad;

    alert(objeto.Cod_Ciudad)
  }

  recibirCiudadDestino(objeto: any){
    this.objetoCiudadDestinoLlega = objeto;
    this.codCiudadD = objeto.Cod_Ciudad;
    this.ciudadD = objeto.Nom_Ciudad;

    alert(objeto.Cod_Ciudad)
  }

  agregarCubicacion(){
    alert("cubi")
  }

  consultarCuenta(){
    alert('Hola')
  }

  capturarGuia(){
    alert("ogolgl")
  }

}
