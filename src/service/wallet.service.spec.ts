import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TokenStorageService } from './token-storage.service';

import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      providers: [ HttpClient, HttpHandler, {provide:HttpHeaders, useValue: {}}, TokenStorageService ]
    });
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#creditUser should return User', () => {
    service.creditUser(1, "2").subscribe(data => {
      expect(data.id).toEqual(1)
    })
  })

  it('#debitUser should return User', () => {
    service.debitUser(1, "2").subscribe(data => {
      expect(data.id).toEqual(1)
    })
  })
});
