import { TestBed } from '@angular/core/testing';

import { IdGenService } from './id-gen.service';

describe('IdGenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdGenService = TestBed.get(IdGenService);
    expect(service).toBeTruthy();
  });
});
