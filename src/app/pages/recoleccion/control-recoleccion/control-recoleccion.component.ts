import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RecoleccionService } from 'src/app/services/recoleccion.service';
import { SatoService } from 'src/app/services/sato.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { PlanillaReparto } from '../../../interfaces/planilla-reparto.interface';
import { PlanillaRecoleccion } from '../../../interfaces/planilla-recoleccion.interface';
import "chart.piecelabel.js";

@Component({
  selector: 'app-control-recoleccion',
  templateUrl: './control-recoleccion.component.html',
  styleUrls: ['./control-recoleccion.component.css']
})
export class ControlRecoleccionComponent implements OnInit {
  forma: FormGroup;
  cargando: boolean = false;
  planillas_rec: PlanillaRecoleccion[]=[];
  planillas_rep: PlanillaReparto[]=[];
  planilla_rec: PlanillaRecoleccion;
  planilla_rep: PlanillaReparto;

  num_planilla_rec: number=0;

  public doughnutChartLabels: Label[] = ['Entregadas', 'En reparto'];
  public doughnutChartData: MultiDataSet = [
    [150, 65],
  ];
  public doughnutChartType: ChartType = 'pie';
  public pieChartLegend: true;
  public colors: Color[]=[{
    backgroundColor: ['#bff000','#bf0000']}];

    public chartOptions: any = {
      pieceLabel: {
        render: function (args) {
          //console.log(args)
          const label = args.label,
                value = args.value;
          return label + ': ' + value;
        }
      }
    }
    
  constructor(private fb: FormBuilder, 
    public tools: ToolsService, 
    public userS: UserService, 
    private satoS:SatoService,
    private recoleccionS: RecoleccionService,
    private authS:AuthService) { 

    this.construirFormulario();
}

construirFormulario(){
  this.forma= this.fb.group({
  txtFecha: ['', Validators.required],
  drpEmbalaje: ['', Validators.required],
  drpFrente: [''],
  drpZona: [''],
  })
}

ngOnInit(): void {
  this.tools.mostrarNavbar();
  this.tools.asignarTituloOpcion('Control Recolección');
}

consultar(){

}

public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
console.log(event, active);
alert("jaime")
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
console.log(event, active);
}

}
