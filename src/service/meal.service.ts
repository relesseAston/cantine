import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_ROOT = 'http://localhost:8080/lunchtime/meal/';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http:HttpClient) { }

  findById(id:number) {
    return this.http.get(API_ROOT + "find/" + id);
  }
}
