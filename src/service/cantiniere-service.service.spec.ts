import { TestBed } from '@angular/core/testing';

import { CantiniereServiceService } from './cantiniere-service.service';

describe('CantiniereServiceService', () => {
  let service: CantiniereServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantiniereServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
