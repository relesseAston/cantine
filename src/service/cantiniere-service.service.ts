import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CantiniereServiceService {

  api_url = "http://localhost:8080/lunchtime/";
  token ='';
  httpOptions:any;
  
  constructor( public http: HttpClient, private token_storage:TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token_storage.getToken()
      })
    }
  }

  async getMenus(): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findall", this.httpOptions).toPromise();
  }

  async getImageMenus(id_menu : number): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findimg/"+id_menu).toPromise();
  }

  async getWeekMenus(): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findallavailablefortoday").toPromise();
  }

  async getWeekMeal(): Promise<any>{
    return this.http.get<any>(this.api_url+"meal/findallavailableforweek/1").toPromise();
  }

  async getImageMeal(id_meal: number): Promise<any> {
    return this.http.get<any>(this.api_url+'meal/findimg/'+id_meal).toPromise();
  }

  async getMealById(id_meal: number): Promise<any> {
    return this.http.get<any>(this.api_url+'meal/find/'+id_meal).toPromise();
  }

  findById(id:number) {
    return this.http.get(this.api_url + 'menu/find/' + id);
  }
  
}
