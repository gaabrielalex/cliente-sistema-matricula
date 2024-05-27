import { TestBed } from '@angular/core/testing';

import { AvaliadorGuardService } from './avaliador-guard.service';

describe('AvaliadorGuardService', () => {
  let service: AvaliadorGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliadorGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
