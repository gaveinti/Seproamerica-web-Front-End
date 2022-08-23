import { TestBed } from '@angular/core/testing';

import { ClienteWAService } from './cliente-wa.service';

describe('ClienteWAService', () => {
  let service: ClienteWAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteWAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
