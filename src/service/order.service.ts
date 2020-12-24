import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Commande } from '../app/models/Commande';
import { TokenStorageService } from './token-storage.service';

const ORDER_ROOT = "http://localhost:8080/lunchtime/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions : any;
  //headers: any;

  constructor(private http:HttpClient, private token_storage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token_storage.getToken()
      })
    };
   }

  addOrder(cart) {
    return this.http.put(ORDER_ROOT + '/add', cart);
  }

  findAll(): Observable<any> {
    return this.http.get<Commande[]>(ORDER_ROOT + '/findall', this.httpOptions);
  }

  findAllbyUser(id: number): Observable<any> {
    return this.http.get<Commande[]>(ORDER_ROOT + '/findallforuser/' + id, this.httpOptions);
  }

  cancel(id: number) {
    return this.http.patch(ORDER_ROOT + '/cancel/' + id, {});
  }

}
