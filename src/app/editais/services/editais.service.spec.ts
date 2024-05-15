import { TestBed } from '@angular/core/testing';

import { EditaisService } from './editais.service';

describe('EditaisService', () => {
  let service: EditaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
