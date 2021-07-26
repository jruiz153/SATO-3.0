import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  forma: FormGroup;

  constructor(private router:Router, private fb: FormBuilder,public tools: ToolsService) {
    this.forma = this.fb.group({
      txtGuia: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  buscar(){
    //this.tools.cambiarPosicionMenu('start')
    //this.toggleSidenav.emit();
    this.router.navigate(['/main/results',this.forma.get('txtGuia').value]);
  }

  submit(){

  }

}