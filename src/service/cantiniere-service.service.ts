import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CantiniereServiceService {

  api_url = "http://localhost:8080/lunchtime/";
  token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxLCJhZGRyZXNzIjoiMTkgUlVFIERFIENBTFZBUyIsIndhbGxldCI6MTIuOTgsInBvc3RhbENvZGUiOiI1OTQ5MiIsInJlZ2lzdHJhdGlvbkRhdGUiOlsyMDIwLDcsMTIsMTEsNCwxXSwiZW1haWwiOiJ0b3RvQGdtYWlsLmNvbSIsImlzTHVuY2hMYWR5Ijp0cnVlLCJuYW1lIjoiRHVtYXMiLCJmaXJzdG5hbWUiOiJKZWFuIiwicGhvbmUiOiI5ODc0MTQwNTk5IiwidG93biI6IkhPWU1JTExFIiwic2V4IjoyLCJzdGF0dXMiOjAsImltYWdlSWQiOjF9LCJyb2xlcyI6WyJST0xFX0xVTkNITEFEWSJdLCJpc3MiOiJzZWN1cmUtYXBpIiwiYXVkIjoic2VjdXJlLWFwcCIsInN1YiI6InRvdG9AZ21haWwuY29tIiwiZXhwIjoxNjAzMTE5ODY3fQ.j-araqREHrebVOj_0QCSNYlj_Bz-chdyPN3vTVUzniW2Fhn16-FF1kk_SpOOgFXgz19Swz-YSAa-H72NLaef_Q';
  
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
}
