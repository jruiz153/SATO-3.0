import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material.modules';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { LoadingComponent } from './loading/loading.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AutocompleteOperadoresComponent } from './autocomplete/autocomplete-operadores/autocomplete-operadores.component';
import { AutocompleteCiudadesComponent } from './autocomplete/autocomplete-ciudades/autocomplete-ciudades.component';

@NgModule({
  declarations: [
    NavbarComponent, 
    HeaderComponent, 
    MenuComponent, 
    SearchComponent, 
    ResultsComponent, 
    LoadingComponent, 
    AutocompleteOperadoresComponent,
    AutocompleteCiudadesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  exports: [
    NavbarComponent, 
    HeaderComponent, 
    MenuComponent, 
    SearchComponent, 
    ResultsComponent, 
    LoadingComponent, 
    AutocompleteOperadoresComponent,
    AutocompleteCiudadesComponent
  ]
})
export class SharedModule { }