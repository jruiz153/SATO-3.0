import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SatoService } from 'src/app/services/sato.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';
import { RepartoService } from 'src/app/services/reparto.service';
import { CC } from 'src/app/interfaces/cc.interface';
//import { GuiaCC } from '../../../interfaces/guia.interface';

@Component({
  selector: 'app-crear-control-cargue',
  templateUrl: './crear-control-cargue.component.html',
  styleUrls: ['./crear-control-cargue.component.css']
})
export class CrearControlCargueComponent implements OnInit {
  @ViewChild("myCodRegional") myInputField: ElementRef;
  @ViewChild("myControlCargue") myInputCC: ElementRef;
  @ViewChild("myNuevoCC") myNuevoCC: ElementRef;
  @ViewChild("myCC") myCC: ElementRef;

  //objetoOperadorLlega: any;

  forma: FormGroup;
  cod_regional:number=1;
  permisos :any=[];
  rutas :any=[];
  guias :any[]=[];
  operadores :any=[];

  //datos del control de cargue
  cc :any;
  estado = '';
  cod_operador:number;
  selected = 0;
  fecha = '';
    
  opcion_activa = "";
  mensaje_error: string = "";
  guia_cambiar_cc: string = "";
  registro_activo: number = -1;
  origen="adicion";

  cod_regional_void: number = 0;
  cod_formapago_void: number = 0;
  cons_guiasu_void: number = 0;

  /*booleanos*/
  error= false;
  cargando = false;
  cargando_guia = false;
  cargando_guias = false;
  
  /*activaciones  - bloqueos*/
  bloqueo_anular = true;
  mostrar_panel_anular = false;

  /*retornos*/
  validacion_guia: any;

  constructor(private fb: FormBuilder, 
              public tools: ToolsService, 
              public userS: UserService, 
              private authS:AuthService, 
              private repartoS: RepartoService, 
              private satoS: SatoService) {

        this.construirFormulario();
   }

  construirFormulario(){
    this.forma = this.fb.group({
      txtControlCargue: [''],
      txtCodigoRuta: [''],
      drpEmbalaje: ['', Validators.required],
      drpRuta: ['', Validators.required],
      drpOperador: ['', Validators.required],
      txtCodRegional: ['',[Validators.required,Validators.max]],
      txtCodFormaPago: [''],
      txtConsGuiasU: [''],
      txtCodigo: [''],
      txtConsSalida: [''],
      txtNuevoControlCargue: [''],
    })
  }

  ngOnInit(): void {
    this.opcion_activa = localStorage.getItem('opcion_activa');
    this.cod_regional= 1; //this.authS.cod_regional;
    this.tools.mostrarNavbar();
    //this.tools.asignarTituloOpcion('Crear control cargue');
    this.cargarPermisos();
    this.fecha = this.authS.fecha_sistema;
  }

  cargarPermisos(){
    const data = {
      Cod_Usuario: this.authS.UsuarioEnviaNet,
      Nom_Opcion: this.opcion_activa
    }
    this.userS.consultarAccionesOpcionUsuario(data).subscribe(res=>{
      this.permisos = res;

      let newObj = this.permisos.filter((value)=>{
          return value.Nom_Accion.indexOf("CONSULTAR") != -1 ? value : null
      });
    })
  }

  consultarCC(){
    this.cargando = true;
    this.error = true;
    this.mensaje_error='';
    this.mostrar_panel_anular = false;
    this.guia_cambiar_cc = '';
    this.registro_activo = -1;

    this.consultarCCPromesa(this.forma.controls.txtControlCargue.value).then((resp:any) =>{
      this.cc =resp;
      this.estado = resp.Estado_ControlC;
      this.bloqueo_anular = this.estado =='CE' ? true: false ;

      if(resp.Cod_Regional > 0){
        this.tools.mensaje_ok('Control de cargue encontrado!');
        this.error = false;

        this.forma.patchValue({
          drpEmbalaje : resp.Mca_TEmbalaje,
          txtCodigoRuta : resp.Cod_RutaR,
          txtCodigo : resp.Cod_Responsable,
          txtConsSalida : resp.Cons_Salida
        })

        this.consultarRutasPromesa().then((resp2:any) =>{
          this.rutas =resp2;
          this.forma.get('drpRuta').patchValue(resp.Cod_RutaR.toString());
        })

        this.consultarOperadoresPromesa().then((resp3:any) =>{
          this.operadores =resp3;
          this.forma.get('drpOperador').patchValue(resp.Cod_Responsable.toString());
        })
        
        this.consultarGuiasPromesa().then((resp4:any) =>{
          this.origen="consulta";
          this.guias =resp4;

        })
        this.cargando = false;
      }
      else{
        this.bloqueo_anular = true;
        //this.forma.reset();
        this.limpiarCabezote();
        this.tools.mensaje_error("CC no existe")
        this.error = true;
        this.mensaje_error="Control de cargue no existe!"
        this.cargando = false;
        this.guias = [];
      }
    })
  }

  consultarCCPromesa(cc: number){
    return new Promise( resolve => {
      const data={
        Cod_Regional: this.cod_regional,
        Num_ControlC: cc
      }
      
      this.repartoS.consultarControlCargue(data).subscribe((res:any)=>{
        resolve(res);
      })
    }); 
  }

  consultarRutasPromesa(){
    return new Promise( resolve => {
      const data={
        Cod_Regional: this.cod_regional,
        Mca_TEmbalaje: this.forma.controls.drpEmbalaje.value
      }

      this.repartoS.consultarRutas(data).subscribe(res=>{
        resolve(res);
      })
    }); 
  }

  consultarOperadoresPromesa(){
    return new Promise( resolve => {

      const data={
        Cod_Regional:this.cod_regional,
        Nom_Empleado:"",
        Tipo:"todos",
      }
      this.satoS.consultarOperadores(data).subscribe(res=>{
        resolve(res);
      })
    });  
  }

  consultarGuiasPromesa(){
    return new Promise( resolve => {
      const data={
        Cod_Regional: this.cod_regional,
        Num_ControlC: this.forma.controls.txtControlCargue.value
      }

      this.repartoS.consultarGuiasControlCargue(data).subscribe(res=>{
        resolve(res);
      })
    }); 
  }

  buscarCodigoRuta(){
    this.forma.get('drpRuta').patchValue(this.forma.controls.txtCodigoRuta.value);

    alert(this.forma.get('drpRuta').value);
  }

  buscarCodigo(){
    this.forma.get('drpOperador').patchValue(this.forma.controls.txtCodigo.value);
  }

   consultarRutas(){
    const data={
      Cod_Regional: this.cod_regional,
      Mca_TEmbalaje: this.forma.controls.drpEmbalaje.value
    }

    this.repartoS.consultarRutas(data).subscribe(res=>{
      this.rutas =res;
    })

    this.consultarOperadores();
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

  adicionarGuia(){
    const data={
      Cod_RegionalP: this.cod_regional,
      Fec_Proceso: this.fecha,
      Cod_Regional: this.forma.controls.txtCodRegional.value,
      Cod_FormaPago: this.forma.controls.txtCodFormaPago.value,
      Cons_GuiasU: this.forma.controls.txtConsGuiasU.value,
    }

    this.cargando_guia = true;
    this.error = false;

    this.repartoS.validarGuiaControlCargue(data).subscribe((res:any) =>{
      this.validacion_guia= res;

      if(res.Descripcion ==''){
        this.guias.push(
          { 
            Cod_Regional: this.forma.controls.txtCodRegional.value, 
            Cod_FormaPago: this.forma.controls.txtCodFormaPago.value,
            Cons_GuiasU: this.forma.controls.txtConsGuiasU.value,
            Des_EstadoG:res.Des_EstadoG, 
            Cod_EstadoG: res.Cod_EstadoG, 
            Con_CartaPorte: res.Con_CartaPorte})

            this.cargando_guia = false;
            this.error = false;
            this.limpiarControles();
      }
      else{
          this.error = true;
          this.mensaje_error = res.Descripcion;
          this.cargando_guia = false;
          this.limpiarControles();
      }
    },
    err=>{
      this.error = false;
      this.cargando_guia = false;
      this.limpiarControles();
      alert("Error consultando guia")
      }
    )
  }

  eliminarGuia(index, guia){
    this.mostrar_panel_anular = this.origen === 'consulta' ? true : false;
    this.cod_regional_void = guia.Cod_Regional;
    this.cod_formapago_void = guia.Cod_FormaPago;
    this.cons_guiasu_void = guia.Cons_GuiasU;
    this.guia_cambiar_cc = guia.Guia;
    this.registro_activo = index;

    if(this.origen === 'adicion'){
      this.guias.splice(index, 1);
      this.tools.mensaje_ok('Guia eliminada')
    } 
    else{
      this.tools.mensaje_error("activando")
      this.myNuevoCC.nativeElement.focus();
    }
  }

  cambiarGuiaCC(){
    if(this.forma.controls.txtNuevoControlCargue.value ===''){
      this.tools.mensaje_error('Debe ingresar el control de cargue.')
    }
    else{

      this.consultarCCPromesa(this.forma.controls.txtNuevoControlCargue.value).then((resp:any) =>{

        if(resp.Estado_ControlC !='AB'){
              this.tools.mensaje_error('Control de cargue no existe o estado NO valido')
          }
          else{
            const data={
              Cod_Regional: this.cod_regional_void,
              Cod_FormaPago: this.cod_formapago_void,
              Cons_GuiasU: this.cons_guiasu_void,
              Num_ControlC : this.forma.controls.txtNuevoControlCargue.value
            }
            this.tools.mensaje_ok('CC OK')
           /* this.repartoS.retirarGuiaControlCargue(data).subscribe(res=>{
              this.tools.mensaje_ok('Guia eliminada de BD')
            })*/
          }
      })
      
    }
  }

  grabar(){
    alert('Creando CC')
  }

  anular(){
    alert('Anulando')
  }

  nuevo(){
    this.forma.reset();
    this.guias = [];
    this.estado = '';
  }

  imprimir(){
    const cc: CC = {
      cod_regional: this.cod_regional,
      num_controlc : this.forma.controls.txtControlCargue.value,
      cons_salida: this.forma.controls.txtConsSalida.value
    }

    console.log(cc);
    this.repartoS.actualizarControlCargue(cc).subscribe( res=>{
      this.tools.mensaje_ok("Ok");
    },
    error => {
      this.tools.mensaje_error("Error actualizando!");
    })
  }

  limpiarCabezote(){

    this.forma.patchValue({
      txtControlCargue: '',
      drpEmbalaje: '',
      txtCodigoRuta: '',
      drpRuta: '',
      txtConsSalida: ''
    })

    /*this.forma.controls.txtControlCargue.setValue('');
    this.forma.controls.drpEmbalaje.setValue('');
    this.forma.controls.txtCodigoRuta.setValue('');
    this.forma.controls.drpRuta.setValue('');
    this.forma.controls.txtConsSalida.setValue('');*/
    
    this.myCC.nativeElement.focus();
  }

  limpiarControles(){
    this.forma.controls.txtCodRegional.setValue('');
    this.forma.controls.txtCodFormaPago.setValue('');
    this.forma.controls.txtConsGuiasU.setValue('');
    this.myInputField.nativeElement.focus();
  }


}

