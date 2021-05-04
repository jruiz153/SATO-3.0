import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(public tools: ToolsService) { }

  ngOnInit(): void {

    this.tools.asignarTituloOpcion('Main');
  }

}
