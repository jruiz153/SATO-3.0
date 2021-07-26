import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter,map } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  public titulo: string;
  constructor(public tools: ToolsService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data)
    )
    .subscribe(data =>{
      this.titulo = data.titulo;
      console.log(data)
    })
  }

  onabrirPanelDerecha(): void{
    this.tools.cambiarPosicionMenu('end')
    this.toggleSidenav.emit();
  }

  logout(){
    this.auth.logout();
  }
}