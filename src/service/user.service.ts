import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url = "http://localhost:8080/lunchtime/";
  httpOptions : any;

  constructor(private http: HttpClient, private token_storage: TokenStorageService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token_storage.getToken()
      })
    };
  }

  getAllUser(): Promise<any>{
    return this.http.get<any>(this.api_url+'user/findall').toPromise();
  }

  async getImgUser(id_user: number): Promise<any> {
    console.log(this.httpOptions);
    return this.http.get<any>(this.api_url+'user/findimg/'+id_user, this.httpOptions).toPromise();
  }

  updateProfile(idUser: number, userForm: any): Promise<any> {
    return this.http.patch<any>(this.api_url+'user/update/'+idUser, userForm, this.httpOptions).toPromise();
  }
}
