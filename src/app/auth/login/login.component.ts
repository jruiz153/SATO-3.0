import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { AuthService } from '../../../app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  buscando = false;

  constructor(private fb: FormBuilder, 
              public tools: ToolsService,
              private authService: AuthService,
              private router: Router,) {
    this.tools.esconderNavbar();

    this.frmLogin = this.fb.group({
      txtUsuario: ['', Validators.required],
      txtPassword: ['', Validators.required],
    });
   }

   ngOnInit(): void {
    this.tools.esconderNavbar();
  }

  submit() {
    if (this.frmLogin.invalid) {
      this.tools.mensaje_error('Debe diligenciar todos los datos');
      return false;
      }
      else{
          const data: any = {
            Usuario: this.frmLogin.value.txtUsuario,
            Password: this.frmLogin.value.txtPassword,
          };

          this.buscando = true;
          this.authService.login(null, data).subscribe(
            response => {
                this.buscando = false;
                if (response.Cod_Empleado !== 0){
                  //this.router.navigateByUrl('/inicio');
                  this.router.navigate(['/main']);
                    setTimeout(() =>{
                    window.location.reload();
                    }, 400);
                }
                else{
                  this.tools.mensaje_error('Usuario invalido');
                }
            },
            error => {
              this.buscando = false;
              this.tools.mensaje_ok('error conectando a la API');
            });
      }
   }

}
