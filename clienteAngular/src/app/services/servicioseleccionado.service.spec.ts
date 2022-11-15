import { TestBed } from '@angular/core/testing';

import { ServicioseleccionadoService } from './servicioseleccionado.service';

describe('ServicioseleccionadoService', () => {
  let service: ServicioseleccionadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioseleccionadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
