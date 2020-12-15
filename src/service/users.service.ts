import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRecap } from '../app/models/UserRecap';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _API_URL = "http://localhost:8080/lunchtime/";

  constructor(private http :HttpClient) { }

  getUsers() :Observable<any> {  
    return this.http.get<UserRecap[]>(this._API_URL + 'user/findall', {observe: "response"});
  }
}
