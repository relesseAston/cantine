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

  const mockCart = { 
    userId: 0,
    constraintId: 0,
    quantity: [
      {
        quantity: 0,
        mealId: 0,
        menuId: 0
      }
    ]
  }


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addOrder should put order in database', () => {
    service.addOrder(mockCart).subscribe(data => {
      expect(data).toBe(true)
    })
  })

  it('#findAll should return all orders', () => {
    service.findAll().subscribe(data => {
      expect(data.length).toBeGreaterThan(0)
    })
  })

  it('#findTodayOrders should return all orders pass today', () => {
    service.findTodayOrders().subscribe(data => {
      expect(data.length).toBeGreaterThan(0)
    })
  })

  it('#cancel should change the order status to CANCELED(2)', () => {
    service.cancel(1).subscribe(data => {
      expect(data).toBe(true)
      expect(data["statut"]).toEqual(2)
    })
  })

  it('#pay should change the order status to DELIVRED(1)', () => {
    service.pay(1).subscribe(data => {
      expect(data).toBe(true)
      expect(data["statut"]).toEqual(1)
    })
  })

  it('#findById should get specific order ', () => {
    service.findById(1).subscribe(data => {
      expect(data).toBe(true)
      expect(data["id"]).toEqual(1)
    })
  })
});
