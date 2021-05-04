import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SatoService } from 'src/app/services/sato.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';
import { RepartoService } from 'src/app/services/reparto.service';
import { GuiaCC } from '../../../interfaces/guia.interface';

@Component({
  selector: 'app-crear-control-cargue',
  templateUrl: './crear-control-cargue.component.html',
  styleUrls: ['./crear-control-cargue.component.css']
})
export class CrearControlCargueComponent implements OnInit {
  @ViewChild("myCodRegional") myInputField: ElementRef;
  @ViewChild("myControlCargue") myInputCC: ElementRef;
  
  forma: FormGroup;
  cod_regional:number=1;
  permisos :any=[];
  rutas :any=[];
  guias :any[]=[];
  operadores :any=[];
  cc :any;
  estado = '';

  objetoOperadorLlega: any;
  cod_operador:number;
  selected = 0;
  error= false;
  mensaje_error: string = "";
  opcion_activa ="";
  /*cargas*/
  cargando= false;
  cargando_guia= false;
  cargando_guias= false;

  validacion_guia: any;

  constructor(private fb: FormBuilder, public tools: ToolsService, public userS: UserService, 
              private authS:AuthService, private repartoS: RepartoService, private satoS: SatoService) {

              const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';
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
    })
   }

  ngOnInit(): void {
    this.opcion_activa = localStorage.getItem('opcion_activa');
    this.cod_regional=this.authS.cod_regional;
    this.tools.mostrarNavbar();
    this.tools.asignarTituloOpcion('Crear control cargue');
    this.cargarPermisos();
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
      console.log(newObj)
    })
  }
  consultarCC(){
    this.cargando = true;
    this.error = true;
    this.mensaje_error='';

    this.consultarCCPromesa().then((resp:any) =>{
      this.cc =resp;
      this.estado = resp.Estado_ControlC;

      if(resp.Cod_Regional > 0){
        this.error = false;
        this.forma.controls.drpEmbalaje.setValue(resp.Mca_TEmbalaje);
        this.forma.controls.txtCodigoRuta.setValue(resp.Cod_RutaR);
        this.forma.controls.txtCodigo.setValue(resp.Cod_Responsable);
        this.forma.controls.txtConsSalida.setValue(resp.Cons_Salida);

        this.consultarRutasPromesa().then((resp2:any) =>{
          this.rutas =resp2;
          this.forma.get('drpRuta').patchValue(resp.Cod_RutaR.toString());
        })

        this.consultarOperadoresPromesa().then((resp3:any) =>{
          this.operadores =resp3;
          this.forma.get('drpOperador').patchValue(resp.Cod_Responsable.toString());
        })
        
        this.consultarGuiasPromesa().then((resp4:any) =>{
          this.guias =resp4;

        })
        this.cargando = false;
      }
      else{
        this.forma.reset();
        this.tools.mensaje_error("CC no existe")
        this.error = true;
        this.mensaje_error="Control de cargue no existe!"
        this.cargando = false;
      }
    })
    
    
  }

  consultarCCPromesa(){
    return new Promise( resolve => {
      const data={
        Cod_Regional: 1,
        Num_ControlC: this.forma.controls.txtControlCargue.value
      }
      
      this.repartoS.consultarControlCargue(data).subscribe((res:any)=>{
        resolve(res);
      })
    }); 
  }

  consultarRutasPromesa(){
    return new Promise( resolve => {
      const data={
        Cod_Regional: 1,
        Mca_TEmbalaje: this.forma.controls.drpEmbalaje.value
      }

      this.repartoS.consultarRutas(data).subscribe(res=>{
        resolve(res);
      })
    }); 
  }

  consultarOperadoresPromesa(){
    return new Promise( resolve => {
      if(this.cod_regional==0){this.cod_regional=1}

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
        Cod_Regional: 1,
        Num_ControlC: this.forma.controls.txtControlCargue.value
      }

      this.repartoS.consultarGuiasControlCargue(data).subscribe(res=>{
        resolve(res);
      })
    }); 
  }

  buscarCodigoRuta(){
    this.forma.get('drpRuta').patchValue(this.forma.controls.txtCodigoRuta.value);
  }

  buscarCodigo(){
    this.forma.get('drpOperador').patchValue(this.forma.controls.txtCodigo.value);
  }

   consultarRutas(){
    const data={
      Cod_Regional: 1,
      Mca_TEmbalaje: this.forma.controls.drpEmbalaje.value
    }

    this.repartoS.consultarRutas(data).subscribe(res=>{
      this.rutas =res;
    })

    this.consultarOperadores();
  } 

  consultarOperadores(){
    if(this.cod_regional==0){this.cod_regional=1}

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
      Cod_RegionalP:this.cod_regional,
      Fec_Proceso:'24/03/2011',
      Cod_Regional:this.forma.controls.txtCodRegional.value,
      Cod_FormaPago:this.forma.controls.txtCodFormaPago.value,
      Cons_GuiasU:this.forma.controls.txtConsGuiasU.value,
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

  eliminarGuia(index){
    this.guias.splice(index, 1);
    this.tools.mensaje_ok('Guia eliminada')
  }

  recibirOperador(objeto: any){
    this.objetoOperadorLlega = objeto;
    this.cod_operador = objeto.Cod_Empleado;
  }


  grabar(){

  }

  anular(){
    
  }

  nuevo(){
    this.forma.reset();
    this.guias = [];
    this.estado = '';
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

/* consultarCC(){
    const data={
      Cod_Regional: this.cod_regional,
      Num_ControlC: this.forma.controls.txtControlCargue.value
    }
    this.repartoS.consultarControlCargue(data).subscribe((res:any)=>{
      this.cc =res;

      if(res.Cod_Regional > 0){
        this.tools.mensaje_ok('Control de cargue ' + this.forma.controls.txtControlCargue.value + ' encontrado')
        
        this.forma.controls.drpEmbalaje.setValue(res.Mca_TEmbalaje);
        this.forma.controls.txtCodigoRuta.setValue(res.Cod_RutaR);
        
        this.consultarRutas();

        //this.forma.controls.drpRuta.setValue(res.Cod_RutaR);

        this.repartoS.consultarGuiasControlCargue(data).subscribe(guias=>{
          this.guias =guias;
        })
      } 
      else{
        this.tools.mensaje_error('Control de cargue ' + this.forma.controls.txtControlCargue.value + ' no existe')
        this.forma.controls.txtControlCargue.setValue('');
        this.myInputCC.nativeElement.focus();
      }
    })
  } */

  
   /* consultarRutas(){
    const data={
      Cod_Regional: 1,
      Mca_TEmbalaje: "CA"
    }

    this.repartoS.consultarRutas(data).subscribe(res=>{
      this.rutas =res;
    })
  }  */

  /* consultarOperadores(){
    if(this.cod_regional==0){this.cod_regional=1}

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
  } */

