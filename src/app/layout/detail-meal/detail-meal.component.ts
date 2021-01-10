import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { IngredientService } from 'src/service/ingredient.service';
import { CartComponent } from 'src/app/layout/cart/cart.component';

@Component({
  selector: 'app-detail-meal',
  templateUrl: './detail-meal.component.html',
  styleUrls: ['./detail-meal.component.css'],
  providers: [CartComponent]
})
export class DetailMealComponent implements OnInit {

  mealId : number;
  meal: any;
  mealImg64: String;
  quantity = 1;
  panelOpenState = false;

  constructor(private route: ActivatedRoute, private cantiniere_service: CantiniereServiceService, private igrd_service: IngredientService, private cart: CartComponent) { }

  ngOnInit(): void {
    this.mealId = parseInt(this.route.snapshot.paramMap.get("mealId"));
    this.getMealById();
    this.getImageMeal();
  }

  async getMealById() {
    const response = await this.cantiniere_service.getMealById(this.mealId);
    //console.log(response);
    if(response.description == undefined) {
      response.description = "aucune description";
    }
    this.meal = response;
    if(this.meal.ingredients != undefined) {
      this.meal.ingredients.forEach(element => {
        this.getIgrdImage(element.id);
      });
    }
  }

  async getIgrdImage(igrd_id: number) {
    const response = await this.igrd_service.getIgrdImage(igrd_id);
    this.meal.ingredients.forEach(element => {
      if(element.imageId == response.id) {
        element.img64 = response.image64;
      }
      if(element.description == undefined) {
        element.description = "aucune description";
      }
    });
  }

  async getImageMeal() {
    const response = await this.cantiniere_service.getImageMeal(this.mealId);
    this.mealImg64 = response.image64;
  }

  changeQuantity(quantity) {
    if(quantity > 0) this.quantity = quantity;
  }

  addToCart() {
    console.log(this.meal)
    const orderMeal = {
      quantity: this.quantity,
      menuId: null,
      mealId: this.mealId
    }
    this.cart.addToCart(orderMeal)
  }

}
