import { TestBed } from '@angular/core/testing';

import { AlunoGuardService } from './aluno-guard.service';

describe('AlunoGuardService', () => {
  let service: AlunoGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
