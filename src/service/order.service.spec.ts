import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TestObject } from 'protractor/built/driverProviders';

import { OrderService } from './order.service';
import { TokenStorageService } from './token-storage.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClient, HttpHandler, {provide:HttpHeaders, useValue: {}}, TokenStorageService ]
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
