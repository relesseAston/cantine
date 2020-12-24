import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ORDER_ROOT = "http://localhost:8080/lunchtime/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient
  ) { }

  addOrder(cart) {
    return this.http.put(ORDER_ROOT + '/add', cart);
  }

}
