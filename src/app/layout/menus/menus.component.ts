import { Component, OnInit } from '@angular/core';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  listeMenus = [];

  constructor(private cantiniere_api : CantiniereServiceService) { }

  ngOnInit(): void {
    this.getWeekMenus();
  }

  async getWeekMenus(){
    const response = await this.cantiniere_api.getWeekMenus();
    this.listeMenus = response;
    console.log(this.listeMenus);
    this.listeMenus.forEach(element => {
      this.getImageMenu(element.id);
    });
    this.getWeekMeal();
  }

  async getWeekMeal(){
    const response = await this.cantiniere_api.getWeekMeal();
    console.log(response);
    this.listeMenus.forEach(element => {
      if(element.meals != undefined) {
        element.meals.forEach(element2 => {
          //console.log(element2);
          response.forEach(element3 => {
            if(element3.id === element2.id) {
              console.log(element);
            }  
          });
        });
      }
    })
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

}
