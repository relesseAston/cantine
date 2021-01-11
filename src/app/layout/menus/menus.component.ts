import { Component, OnInit } from '@angular/core';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  listeMenus = [];
  panelOpenState = false;
  radioSelected: any;
  allMenus = [];

  constructor(private cantiniere_api : CantiniereServiceService) { }

  ngOnInit(): void {
    this.getWeekMeals();
  }

  async getWeekMenus(){
    const response = await this.cantiniere_api.getWeekMenus();
    this.listeMenus = response;
    this.listeMenus.forEach(element => {
      this.getImageMenu(element.id);
      if(element.meals) {
        element.meals.forEach(element_meal => {
          this.getImageMeal(element_meal.id);
        });
      }
    });
  }

  async getWeekMeals() {
    const response = await this.cantiniere_api.getWeekMeal();
    this.listeMenus = response;
    // console.log(this.listeMenus)
    this.listeMenus.forEach(element => {
      this.getImageMealbyId(element.id);
    })
  }

  async getImageMenu(id_menu) {
    const response = await this.cantiniere_api.getImageMenus(id_menu);
    this.listeMenus.forEach(element => {
      if(element.imageId === response.id){
        element.img = response.image64;
      }
    });
    
  }

  async getImageMeal(id_meal: number) {
    const response = await this.cantiniere_api.getImageMeal(id_meal);
    this.listeMenus.forEach(element => {
      if(element.meals) {
        element.meals.forEach(element_meal => {
          if(element_meal.imageId === response.id){
            element_meal.img64 = response.image64;
          }
        });
      }
    })
  }

  async getImageMealbyId(id_meal: number) {
    const response = await this.cantiniere_api.getImageMeal(id_meal);
    this.listeMenus.forEach(element => {
          if(element.imageId === response.id){
            element.img64 = response.image64;
          }
        })
    }

}
