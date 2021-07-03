import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  @Input() mensaje = '';
  @Input() tipo = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
