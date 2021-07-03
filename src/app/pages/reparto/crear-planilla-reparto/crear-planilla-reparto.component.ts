import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { SatoService } from 'src/app/services/sato.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from '../../../services/auth.service';
import { RepartoService } from '../../../services/reparto.service';

//interfaces
import { CC } from '../../../interfaces/cc.interface';
import { Empleado } from '../../../interfaces/empleado.interface';
import { Oficina } from '../../../interfaces/oficina.interface';
import { Reexpedidor } from '../../../interfaces/reexpedidor.interface';
import { Contratista } from '../../../interfaces/contratista.interface';
import { Tercero } from '../../../interfaces/tercero.interface';
import { Ruta } from '../../../interfaces/ruta.interface';
import { Frente } from '../../../interfaces/frente.interface';
import { Vehiculo } from '../../../interfaces/vehiculo.interface';

@Component({
  selector: 'app-crear-planilla-reparto',
  templateUrl: './crear-planilla-reparto.component.html',
  styleUrls: ['./crear-planilla-reparto.component.css']
})

export class CrearPlanillaRepartoComponent implements OnInit {
  @ViewChild("myCodRegional") myInputField: ElementRef;
  @ViewChild("myCC") myCC: ElementRef;
  @ViewChild("myPlacaenvia") myPlacaenvia: ElementRef;

  forma: FormGroup;
  acciones_c :any;
  cargando= false;
  cod_regional:number;
  
  ccs :CC[]=[];
  guias :any=[];
  rutas:Ruta[]=[];
  frentes:Frente[]=[];
  operadores:Empleado[]=[];
  conductores:Empleado[]=[];
  array_operadores:Empleado[]=[];

  reexpedidores:Reexpedidor[]=[];
  contratistas:Contratista[]=[];
  terceros:Tercero[]=[];

  vehiculos_terceros:Vehiculo[]=[];
  conductores_terceros:any[]=[];

  //datos control de cargue
  cod_macrozona:number=0;
  nom_macrozona:string;
  cod_zonal:number=0;
  nom_zonal:string;
  nom_operador:string;

  //tipos de liquidacion
  tipos_rx:any[]=[];
  tipos_contratista:any[]=[];
  tipos_tercero:any[]=[];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  tipo_vehiculo = '';
  van = '';

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder, 
              public tools: ToolsService, 
              public userS: UserService, 
              private satoS:SatoService,
              private repartoS:RepartoService,
              private authS: AuthService) {

        this.construirFormulario();
   }

   ngOnInit(): void {
    this.tools.mostrarNavbar();
    this.tools.asignarTituloOpcion('Crear planilla de reparto');
    this.cod_regional=1;
    //this.cod_regional=this.authS.cod_regional;
  }

  construirFormulario(){
    this.forma = this.fb.group({
      txtPlanilla: [''],
      txtFecha: ['', Validators.required],
      drpEmbalaje: ['', Validators.required],
      drpTipo: ['', Validators.required],
      drpCCs: ['', Validators.required],
      

      //Acciones
      rblAccion: [''],
      txtCodRegional: [''],
      txtCodFormaPago: [''],
      txtConsGuiasU: [''],

      //envia
      
      drpFrente: [''],
      txtPlacaenvia: [''],
      
      txtCC: [''],
      txtCodigoConductorenvia: [''],
      drpConductorenvia: [''],
      txtCodigoOperador: [''],
      drpOperadorenvia: [''],
      txtCuadrilla: [''],

      //Reexpedidores
      drpReexpedidores: [''],
      drpTipoLiquidacionRX: [''],
     
      txtCodigoConductorRX: [''],
      drpConductorRX: [''],

      txtCodigoOperadorRX: [''],
      drpOperadorRX: [''],

      //Contratistas
      drpContratistas: [''],
      drpTipoLiquidacionContratista: [''],

      //Terceros
      drpTerceros: [''],
      drpRutasTercero: [''],
      drpVehiculosTercero: [''],
      drpTipoLiquidacionTercero: [''],
      drpConductorTercero: [''],
      drpConductorTerceroTX: [''],

      //Acciones
      txtCCPasa: [''],
      txtCodNovedad: [''],
      txtAclaracion: [''],
    })
  }

  consultarParametrosTipo(){
    if(this.forma.controls.drpTipo.value=='envia'){
      
      if(this.conductores.length==0){
        this.consultarConductores();
      }

      if(this.operadores.length==0){
        this.consultarOperadores();
      }

    }
    else if(this.forma.controls.drpTipo.value=='RX'){
      this.repartoS.consultarReexpedidores(this.cod_regional).subscribe(res => {
        this.reexpedidores = res;
        }
      )

      if(this.conductores.length==0){
        this.consultarConductores();
      }

      if(this.operadores.length==0){
        this.consultarOperadores();
      }

    }
    else if(this.forma.controls.drpTipo.value=='CO'){
      this.repartoS.consultarContratistas(this.cod_regional).subscribe(res => {
        this.contratistas = res;
        }
      )
    }
    else{
      this.repartoS.consultarTerceros(this.cod_regional).subscribe(res => {
        this.terceros = res;
        }
      )

      this.consultarRutas();
      this.consultarConductores();
      this.consultarOperadores();
    }
  }

  //Tipos de liquidacion envia y colaboradores
  tiposLiquidacionRX(){
    const data={
      Cod_Regional:this.cod_regional,
      Cod_Oficina: this.forma.controls.drpReexpedidores.value,
    }
    this.repartoS.consultarTiposLiquidacionRX(data).subscribe(res=>{
      this.tipos_rx =res;
    })
  }

  tiposLiquidacionContratistas(){
    const data={
      Cod_Regional:this.cod_regional,
      Cod_Oficina: this.forma.controls.drpContratistas.value,
    }

    this.repartoS.consultarTiposLiquidacionContB(data).subscribe(res=>{
      this.tipos_contratista =res;

       if(this.tipos_contratista.length===1){
        this.forma.controls.drpTipoLiquidacionContratista.setValue(res[0].Cod_Tipo);
      }

    })
  }

   //Buscar informacion tercero
   consultarTercero(){
    this.repartoS.ConsultarVehiculosTerceros(this.forma.controls.drpTerceros.value).subscribe(res=>{
      this.vehiculos_terceros= res;
    })

    this.repartoS.consultarTiposLiquidacionTercero(this.forma.controls.drpTerceros.value).subscribe(rest=>{
      this.tipos_tercero= rest;
    })

    this.repartoS.ConsultarConductoresTerceros(this.forma.controls.drpTerceros.value).subscribe(res2=>{
      this.conductores_terceros =res2;
    })
  }
  
  //Controles de cargue
  adicionarCC(){
    const data={
      Cod_Regional: this.cod_regional,
      Num_ControlC: this.forma.controls.txtCC.value,
    }

    this.repartoS.consultarControlCargue(data).subscribe((res:any)=>{
      
      if(res.Cod_Regional >0 && res.Estado_ControlC !='CE'){

            this.cod_macrozona = res.Cod_RutaR;
            this.nom_macrozona = res.Nom_Ruta;
            this.cod_zonal = res.Cod_ZonaL;
            this.nom_zonal = res.Nom_ZonaL;

            //if(this.forma.controls.drpTipo.value=='envia'){
              const dataf={
                Cod_Regional: this.cod_regional,
                Cod_RutaR: res.Cod_RutaR,
                Mca_TEmbalaje: res.Mca_TEmbalaje
              }
              console.log(dataf)

              this.satoS.consultarFrentes(dataf).subscribe(resf=>{
                this.frentes = resf;
              })
            //}

            this.ccs.push({num_controlc: data.Num_ControlC});

            this.repartoS.consultarGuiasControlCargue(data).subscribe(res=>{
              this.guias.push(...res);
            })

            this.forma.controls.txtCC.setValue('');
            this.tools.mensaje_ok('CC adicionado')
      }
      else{
        //input.value = '';
        this.tools.mensaje_error('Error: CC no existe o esta cerrado!')
      }
    })
  
  }

  eliminarCC(cc:any): void {
    const index = this.ccs.indexOf(cc);
    
    if (index >= 0) {
      this.ccs.splice(index, 1);
      this.tools.mensaje_ok('Control de cargue retirado');
    }
  }

  //Guias para planillar
  adicionarGuia(){
    this.guias.push(
      { 
        Cod_Regional: this.forma.controls.txtCodRegional.value, 
        Cod_FormaPago: this.forma.controls.txtCodFormaPago.value,
        Cons_GuiasU: this.forma.controls.txtConsGuiasU.value,
        Estado:'ESTADO GUIA', 
        CP:'NO'
      })

      this.limpiarControles();
  }

  //Buscar placa envia
  consultarVehiculoenvia(){
    this.satoS.consultarVehiculo(this.forma.controls.txtPlacaenvia.value).subscribe(res=>{
      if(res.Nom_Tipo !==null){
        this.tipo_vehiculo = res.Nom_Tipo;
        this.van = res.Van;
      }
      else{
        this.myPlacaenvia.nativeElement.focus();
        this.tools.mensaje_error('Placa no encontrada')
      }
    })
  }

  consultarConductores(){
    const data={
      Cod_Regional:this.cod_regional,
    }
    this.satoS.consultarConductores(data).subscribe(res=>{
      this.conductores =res;
    },
    err=>{
      this.tools.mensaje_error("Error consultando conductores")
      }
    )
  }

  consultarOperadores(){
    const data={
      Cod_Regional:this.cod_regional,
      Nom_Empleado:"",
      Tipo:"todos",
    }
    this.satoS.consultarOperadores(data).subscribe(res=>{
      this.operadores =res;
    },
    err=>{
      alert("Error consultando operadores")
      }
    )
  }

  adicionarOperador(){
    let resu :any[]=[];
    //guias_f =  this.operadores.filter(x => x.Codigo == '8439')[0];

    this.array_operadores.push(
      {
        Codigo: this.forma.controls.drpOperadorenvia.value,
        Nom_Empleado: this.nom_operador,
      }
    )
    this.tools.mensaje_ok('Operador adicionado');
  }
  
  eliminarOperador(index:number){
    this.array_operadores.splice(index,1);
    this.tools.mensaje_error('Operador eliminado');
  }

  consultarRutas(){
    const data={
      Cod_Regional: this.cod_regional,
      Mca_TEmbalaje: this.forma.controls.drpEmbalaje.value
    }

    this.repartoS.consultarRutas(data).subscribe(res=>{
      this.rutas =res;
    })
  } 

  //seleccionar codigo en listados
  buscarCodigoConductorenvia(){
    this.forma.get('drpConductorenvia').patchValue(this.forma.controls.txtCodigoConductorenvia.value.toUpperCase());
  }

  buscarCodigoOperadorenvia(){
    alert(this.forma.controls.txtCodigoOperador.value.toUpperCase());
    this.forma.get('drpOperadorenvia').patchValue(this.forma.controls.txtCodigoOperador.value.toUpperCase());
  }

  getEmpleado($event){
    this.nom_operador= $event.target.options[$event.target.options.selectedIndex].text;
  }

  grabar(){

  }

  anular(){
    
  }

  nuevo(){
    
  }

  imprimir(){
    
  }

  limpiarControles(){
    this.forma.controls.txtCodRegional.setValue('');
    this.forma.controls.txtCodFormaPago.setValue('');
    this.forma.controls.txtConsGuiasU.setValue('');
    this.myInputField.nativeElement.focus();
  }

}
