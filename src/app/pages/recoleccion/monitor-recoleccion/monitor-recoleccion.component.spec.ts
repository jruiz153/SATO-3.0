import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorRecoleccionComponent } from './monitor-recoleccion.component';

describe('MonitorRecoleccionComponent', () => {
  let component: MonitorRecoleccionComponent;
  let fixture: ComponentFixture<MonitorRecoleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorRecoleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorRecoleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
