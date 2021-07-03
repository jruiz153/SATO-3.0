import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {
  forma: FormGroup;
  usuario: any = null;
  opciones: any = [];
  acciones: any = [];
  cod_usuario = "";
  cargando = false;

  constructor(private router: ActivatedRoute, private userS: UserService, private fb: FormBuilder,
              private tools: ToolsService) { 
    this.forma=this.fb.group({

    })
  }

  ngOnInit(): void {
    this.tools.mostrarNavbar();

    this.router.params.subscribe(params=>{
      this.tools.asignarTituloOpcion('Detalle usuario ' + params['id']);

      this.cod_usuario=params['id'];
      this.consultarUsuario(params['id']);
      this.consultarOpcionesUsuario(params['id']);
    })
  }

  consultarUsuario(cod_usuario){
    const data = {
      Cod_Regional:0,
      Cod_Usuario:cod_usuario
    }
    this.userS.consultarDetalleUsuario(data).subscribe(res=>{
      this.usuario = res;
      console.log(res)
    })
  }

  consultarOpcionesUsuario(cod_usuario){
    this.cargando= true;
    this.userS.consultarOpcionesUsuario(cod_usuario).subscribe(res=>{
      this.opciones = res;
      this.cargando= false;
    })
  }

  consultarAccionesOpcion(cod_usuario){
    this.userS.consultarOpcionesUsuario(cod_usuario).subscribe(res=>{
      this.opciones = res;
    })
  }

  onOpcionChange(valevent: MatSelectionListChange){
    const data = {
      Cod_Usuario:this.cod_usuario,
      Nom_Opcion:valevent[0].value
    }

    this.userS.consultarAccionesOpcion(data).subscribe(res=>{
      this.acciones = res;
      console.log(res)
    })
  }

  selectionChange(option: MatListOption) {
    console.log(option)
    alert(option.selected + "--" + option.value);
  }

  accionChange(checked, model){
    alert(checked + "-" +  model.Cod_Accion)
  }

  actualizar(){

  }

}
