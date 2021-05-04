import { AutofillEvent } from '@angular/cdk/text-field';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from '../../services/tools.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  acciones: any = [];

  constructor(public tools: ToolsService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  onToggleSidenav(opcion, link): void{
    localStorage.setItem('opcion_activa', opcion);
    this.toggleSidenav.emit();
  }

  logout(){
    this.auth.logout();
}

}

