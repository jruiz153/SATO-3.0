import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.css']
})
export class GridsComponent implements OnInit {

  @Input() guias: any[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
