import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CantiniereServiceService } from './cantiniere-service.service';
import { TokenStorageService } from './token-storage.service';

describe('CantiniereServiceService', () => {
  let service: CantiniereServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClient, HttpHandler, {provide:HttpHeaders, useValue: {}}, TokenStorageService ]
    });
    service = TestBed.inject(CantiniereServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
