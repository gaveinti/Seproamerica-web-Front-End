import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioseleccionadoComponent } from './servicioseleccionado.component';

describe('ServicioseleccionadoComponent', () => {
  let component: ServicioseleccionadoComponent;
  let fixture: ComponentFixture<ServicioseleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioseleccionadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioseleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
