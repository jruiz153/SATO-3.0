import { Component,EventEmitter, Input, OnInit,Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SatoService } from 'src/app/services/sato.service';


@Component({
  selector: 'app-autocomplete-operadores',
  templateUrl: './autocomplete-operadores.component.html',
  styleUrls: ['./autocomplete-operadores.component.css']
})
export class AutocompleteOperadoresComponent implements OnInit {

  public data$: Observable<any[]>;
  public keyword = 'Nom_Empleado';
  isLoading = false;

  @Output() enviar: EventEmitter<any>;
  @Input() placeholder;
  @Input() cod_regional;

  constructor(private satoS: SatoService) { 
    this.enviar = new EventEmitter();
  }

  ngOnInit(): void {
  }
  //cuando hace clic sobre el registro dispara el evento, y es recibido en el padre con la propiedad (enviar)='recibirMensajeO($event)'
  selectEvent(item) {
    this.enviar.emit(item);
  }

  getServerResponse(event) {
    if(this.cod_regional==0){this.cod_regional=1}
    const data={
      Cod_Regional:this.cod_regional,
      Nom_Empleado:event,
    }
    //this.data$ = this.satoS.consultarOperadoresLetra(data);
  }

  searchCleared() {
    this.data$ = null;
  }

}