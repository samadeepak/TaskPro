import { TestBed } from '@angular/core/testing';

import { ConvasContextService } from './convas-context.service';

describe('ConvasContextService', () => {
  let service: ConvasContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvasContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
