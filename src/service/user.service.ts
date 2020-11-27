import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
