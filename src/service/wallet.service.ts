import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private _API_URL = "http://localhost:8080/lunchtime/user";

  constructor(private http: HttpClient) { }

  creditUser(id:number, amount: string) :Observable<any>{
    let parsedAmount = parseInt(amount)
    return this.http.post<any>(`${this._API_URL}/credit/${id}?amount=${parsedAmount}`, {});
  }

  debitUser(id:number, amount: any) :Observable<any> {
    let parsedAmount = parseInt(amount)
    return this.http.post<any>(`${this._API_URL}/debit/${id}?amount=${parsedAmount}`, {});
  }
}
