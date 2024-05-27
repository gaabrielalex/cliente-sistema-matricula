import { TestBed } from '@angular/core/testing';

import { MatriculasAvaliacaoService } from './matriculas-avaliacao.service';

describe('MatriculasAvaliacaoService', () => {
  let service: MatriculasAvaliacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatriculasAvaliacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
