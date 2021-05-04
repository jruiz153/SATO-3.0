import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { SatoService } from 'src/app/services/sato.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { CC } from '../../../interfaces/cc.interface';

@Component({
  selector: 'app-crear-planilla-reparto',
  templateUrl: './crear-planilla-reparto.component.html',
  styleUrls: ['./crear-planilla-reparto.component.css']
})
export class CrearPlanillaRepartoComponent implements OnInit {
  @ViewChild("myCodRegional") myInputField: ElementRef;

  forma: FormGroup;
  acciones_c :any;
  cargando= false;
  cod_regional:number;
  ccs :CC[]=[];
  guias :any=[];
  operadores :any=[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder, public tools: ToolsService, public userS: UserService, private satoS:SatoService) {

    this.forma = this.fb.group({
      txtPlanilla: [''],
      txtFecha: ['', Validators.required],
      drpEmbalaje: ['', Validators.required],
      drpTipo: ['', Validators.required],
      drpCCs: ['', Validators.required],
      drpOperador: [''],
      txtCC: [''],
      txtCodigoOperador: [''],
    })
   }

   ngOnInit(): void {
    this.tools.mostrarNavbar();
    this.tools.asignarTituloOpcion('Crear planilla de reparto');
  }

  consultarParametrosTipo(){
    //alert("DFG")
  }

  adicionarCC(){
    this.guias.push(
      { 
        Cod_Regional: this.forma.controls.txtCodRegional.value, 
        Cod_FormaPago: this.forma.controls.txtCodFormaPago.value,
        Cons_GuiasU: this.forma.controls.txtConsGuiasU.value,
        Estado:'hola', 
        CP:'No'})

    this.limpiarControles();
  }


  addCC(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.ccs.push({num_controlc: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  removeCC(ruta:any): void {
    const index = this.ccs.indexOf(ruta);

    if (index >= 0) {
      this.ccs.splice(index, 1);
    }
  }


  adicionarGuia(){
    this.guias.push(
      { 
        Cod_Regional: this.forma.controls.txtCodRegional.value, 
        Cod_FormaPago: this.forma.controls.txtCodFormaPago.value,
        Cons_GuiasU: this.forma.controls.txtConsGuiasU.value,
        Estado:'hola', 
        CP:'No'})

    this.limpiarControles();
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
