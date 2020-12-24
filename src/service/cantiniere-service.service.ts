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

  async getWeekMeal(): Promise<any>{
    return this.http.get<any>(this.api_url+"meal/findallavailablefortoday").toPromise();
  }

  findById(id:number) {
    return this.http.get(this.api_url + 'menu/find/' + id);
  }
}
