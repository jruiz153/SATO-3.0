import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SatoService } from 'src/app/services/sato.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-consultar-usuarios',
  templateUrl: './consultar-usuarios.component.html',
  styleUrls: ['./consultar-usuarios.component.css']
})
export class ConsultarUsuariosComponent implements OnInit {
  forma: FormGroup;

  regionales: any = [];
  usuarios: any = [];

  cargando = false;

  constructor(public userS: UserService,private satoS: SatoService, private fb: FormBuilder, public tools: ToolsService) {
    this.forma = this.fb.group({
      drpRegionales: [''],
      txtCodigo: [''],
      txtUsuario: [''],
    })
   }

  ngOnInit(): void {
    console.log(this.userS.acciones_s)
    this.tools.mostrarNavbar();
    this.tools.asignarTituloOpcion('Usuarios SATO');
    this.consultarRegionales();
  }

  consultar(){
    const data ={
      Cod_Regional: this.forma.controls.drpRegionales.value,
      Codigo: this.forma.controls.txtCodigo.value,
      Cod_Usuario: this.forma.controls.txtUsuario.value,
    }
    this.cargando = true;
    this.userS.consultarUsuarios(data).subscribe(res=>{
      this.usuarios = res;
      this.cargando = false;
    })
  }

  consultarRegionales(){
    this.satoS.consultarRegionales().subscribe(res=>{
      this.regionales = res;
    })
  }

}
