import { TestBed } from '@angular/core/testing';

import { NotificacionesFCMService } from './notificaciones-fcm.service';

describe('NotificacionesFCMService', () => {
  let service: NotificacionesFCMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionesFCMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
