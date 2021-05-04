import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(public tools: ToolsService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  onabrirPanelDerecha(): void{
    this.tools.cambiarPosicionMenu('end')
    this.toggleSidenav.emit();
  }

  logout(){
    this.auth.logout();
  }
}