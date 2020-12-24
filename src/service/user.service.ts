import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url = "http://localhost:8080/lunchtime/";

  constructor(private http: HttpClient) { }

  getAllUser(): Promise<any>{
    return this.http.get<any>(this.api_url+'user/findall').toPromise();
  }

  async getImgUser(id_user: number): Promise<any> {
    return this.http.get<any>(this.api_url+'user/findimg/'+id_user).toPromise();
  }
  setInscription(data: any): Observable<any> {

    console.log(data)
    return this.http.put<any>(this.api_url+'user/register', data);
  }
}
