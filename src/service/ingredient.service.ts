import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  api_url = "http://localhost:8080/lunchtime/";
  token ='';

  constructor(public http: HttpClient) { }

  async getIgrdImage(igrd_id: number): Promise<any> {
    return this.http.get<any>(this.api_url+'ingredient/findimg/'+igrd_id).toPromise();
  }
}
