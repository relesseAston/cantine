import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { User } from '../app/models/User';

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

  async getAllUser(): Promise<any>{
    return this.http.get<User>(this.api_url+'user/findall', this.httpOptions).toPromise();
  }

  async getUserById(id:number): Promise<any> {
    return this.http.get<any>(this.api_url + 'user/find/'+id, this.httpOptions).toPromise();
  }

  async getImgUser(id_user: number): Promise<any> {
    // console.log(this.httpOptions);
    return this.http.get<any>(this.api_url+'user/findimg/'+id_user, this.httpOptions).toPromise();
  }

  updateProfile(idUser: number, userForm: any): Promise<any> {
    return this.http.patch<any>(this.api_url+'user/update/'+idUser, userForm, this.httpOptions).toPromise();
  }
  setInscription(data: any): Observable<any> {
    return this.http.put<any>(this.api_url+'user/register', JSON.stringify(data), {headers: {'Content-Type':  'application/json'}});
  }

  async updateImage(obj: any, id: number): Promise<any> {
    return this.http.patch<any>(this.api_url+'user/updateimg/'+id, obj, this.httpOptions).toPromise();
  }

}
