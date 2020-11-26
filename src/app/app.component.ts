import { Component } from '@angular/core';
import { CantiniereServiceService } from '../service/cantiniere-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-cantinere';
  listeMenus = [];
  today = new Date();
  weekNumber : number;

  constructor(private cantiniere_api : CantiniereServiceService){ }

  ngOnInit(){
    this.getWeekNumber();
    //this.getMenus();
    this.getWeekMenus();
  }

  /*async getMenus() {
    
    const response = await this.cantiniere_api.getMenus();
    this.listeMenus = response;
    console.log(this.listeMenus);
    this.listeMenus.forEach(element => {
      this.getImageMenu(element.id);
    });
  }*/

  async getWeekMenus(){
    const response = await this.cantiniere_api.getWeekMenus();
    this.listeMenus = response;
    console.log(this.listeMenus);
    this.listeMenus.forEach(element => {
      this.getImageMenu(element.id);
    });
  }

  async getImageMenu(id_menu) {
    const response = await this.cantiniere_api.getImageMenus(id_menu);
    this.listeMenus.forEach(element => {
      if(element.imageId === response.id){
        element.img = response.image64;
      }
    });
    //console.log(this.listeMenus);
  
  }

  getWeekNumber(): number {
    // Copy date so don't modify original
    this.today.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    this.today.setDate(this.today.getDate() + 4 - (this.today.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(this.today.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    this.weekNumber = Math.ceil((((this.today.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    // Return array of year and week number
    return this.weekNumber;
}



}
