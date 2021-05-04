import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteCiudadesComponent } from './autocomplete-ciudades.component';

describe('AutocompleteCiudadesComponent', () => {
  let component: AutocompleteCiudadesComponent;
  let fixture: ComponentFixture<AutocompleteCiudadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteCiudadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
