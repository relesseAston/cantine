import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../app/models/Commande';

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

  findAll(): Observable<Commande[]> {
    return this.http.get<Commande[]>(ORDER_ROOT + '/findall');
  }

  findAllbyUser(id: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(ORDER_ROOT + '/findallforuser/' + id);
  }

  cancel(id: number) {
    return this.http.patch(ORDER_ROOT + '/cancel/' + id, {});
  }

}
