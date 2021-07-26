import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { OS } from '../../../interfaces/os.interface';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';
import { SatoService } from 'src/app/services/sato.service';
import { RecoleccionService } from 'src/app/services/recoleccion.service';
import { AuthService } from 'src/app/services/auth.service';
import { PlanillaRecoleccion } from '../../../interfaces/planilla-recoleccion.interface';

@Component({
  selector: 'app-monitor-recoleccion',
  templateUrl: './monitor-recoleccion.component.html',
  styleUrls: ['./monitor-recoleccion.component.css']
})
export class MonitorRecoleccionComponent implements OnInit {
  @ViewChild("myCodRegional") myInputField: ElementRef;

  forma: FormGroup;
  acciones_c :any;
  
  cod_regional:number;
  planilla:number=0;

  zonas:any=[];
  planillas:any=[];
  oss:any=[];
  cuentas:any=[];
  resumen:any=[];
  os:OS;

  cargando= false;
  cargandoPlanillas = false;
  cargandoOSs = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  opcion_activa = "";
  registro_activo: number = -1;
  os_activo: number = -1;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private fb: FormBuilder, 
              public tools: ToolsService, 
              public userS: UserService, 
              private satoS:SatoService,
              private recoleccionS: RecoleccionService,
              private authS:AuthService) {
    
    this.construirFormulario();
  }

  construirFormulario(){
    this.forma = this.fb.group({
      drpEmbalaje: ['', Validators.required],
      drpZona: [''],
      
      drpTipoFecha: [''],
      txtFechaConsulta: [''],
      txtCuenta: [''],
      drpCuentas: [''],
      drpAccion: [''],
      chkClientesCelulares: [''],
      chkAccion: [''],
    })
  }

  
  ngOnInit(): void {
    this.cod_regional = 1; //this.authS.cod_regional;
    this.consultarZonas();
  }

  //Consultar zonas logisticas
  consultarZonas(){
    this.satoS.consultarZonasLogisticas(this.cod_regional).subscribe(res=>{
      this.zonas = res;
    })
  }

  //Adicionar una cuenta al combo para consulta
  adicionarCuenta(){
    this.cuentas.push(
      {
        Cuenta:  this.forma.controls.txtCuenta.value
      })
      this.tools.mensaje_ok('Cuenta adicionada!')
  }

  //Consultar planillas de recoleccion
  consultar(){
    const data = {
      Cod_RegionalP: this.authS.cod_regional,
      Mca_TEmbalaje: this.forma.controls.drpEmbalaje.value,
      Cod_ZonaL: this.forma.controls.drpZona.value,
    }

    this.cargandoPlanillas = true;

    this.recoleccionS.consultarPlanillasRecoleccionMonitor(data).subscribe(res=>{
      this.planillas = res;
      this.cargandoPlanillas = false;
    },
    err=>{
      this.tools.mensaje_error('Error consultando las planillas')
    })
  }

  //Consultar planilla de Recoleccion
  consultarPlanilla(planilla: PlanillaRecoleccion, index: number){
    this.planilla=planilla.Num_PlanillaR;
    this.registro_activo = index;
    this.os_activo = -1;
    this.os = null;
    
    const data = {
      Cod_Regional:planilla.Cod_Regional,
      Num_PlanillaR:planilla.Num_PlanillaR,
    }

    this.recoleccionS.consultarResumenPlanillaRecoleccion(data).subscribe(res=>{
      this.resumen = res;
    })

    this.consultarOSsPlanilla(planilla.Cod_Regional,planilla.Num_PlanillaR);
  }

  //Consultar Ordenes de Servicio de una planilla de Recoleccion
  consultarOSsPlanilla(cod_regional:number, planilla:number){
    const data_planilla = {
      Cod_Regional:cod_regional,
      Num_PlanillaR:planilla,
      Mca_TEmbalaje:this.forma.controls.drpEmbalaje.value,
      FecProceso:'',
      PorFecha:0,
      DirFecha:0,
      FilFecha:'',
      PorCuenta:0,
      DirTipo:0,
      Cuenta:'',
      PorTipCliente:0,
      DirTipoCli:0,
      TiposCliente:0,
      EstadoOrdenS:'',
    }

    this.cargandoOSs = true;
    this.recoleccionS.consultarOSsPlanillaRecoleccionMonitor(data_planilla).subscribe(res=>{
      this.oss = res;
      this.cargandoOSs = false;
      console.log(res);
      
      if(this.oss.length === 0){
        this.tools.mensaje_error('No hay ordenes de servicio asignadas a la planilla ' + planilla);
      }
    },
    err => {
      this.tools.mensaje_error('Error cargando ordenes de servicio');
    }
    )
  }
  //Consulta el detalle de una orden de servicio
  detalleOS(os: OS, index: number){
    this.os_activo = index;
    this.os = os;
  }

   //Asignar Orden de servicio a una planilla
  asignarOSPlanilla(planilla:number, index: number){
    this.oss.splice(index, 1);
    this.tools.mensaje_ok("Orden se servicio asignada");
  }

}
