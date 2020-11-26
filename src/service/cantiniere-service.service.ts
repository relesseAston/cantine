import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CantiniereServiceService {

  api_url = "http://localhost:8080/lunchtime/";
  token ='';
  
  constructor( public http: HttpClient) { }

  connexion(obj : any) {
    return this.http.post<any>(this.api_url+'login', obj)
  }

  async getMenus(): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findall",
    {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : this.token
      })
    }).toPromise();
  }

  async getImageMenus(id_menu : number): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findimg/"+id_menu).toPromise();
  }

  async getWeekMenus(): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findallavailablefortoday").toPromise();
  }
}
