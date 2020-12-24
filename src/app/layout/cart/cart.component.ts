import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { MealService } from 'src/service/meal.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { OrderService } from 'src/service/order.service';

const EMPTY_CART = {
    "userId" : 1,
    "constraintId" : 0,
    "quantity": []
  };

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart;
  displayedColumns: string[] = ['meal', 'quantity', 'price'];
  cartTable = [];
  menus = [];

  constructor(
    private orderService:OrderService,
    private mealService:MealService,
    private menuService:CantiniereServiceService 
  ) { 
    if (this.cart = {}) this.cart = EMPTY_CART;
    if (localStorage.getItem('cart')) this.cart = JSON.parse(localStorage.getItem('cart'));
    console.log(this.cart);
    this.fillCartTable()
  }

  ngOnInit(): void {
  }

  addToCart(menu) {
    this.cart.quantity.push(menu);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    //this.fillCartTable();
  }

  order(menu) {
    this.orderService.addOrder(this.cart)
  }

  resetCart() {
    this.cart = EMPTY_CART;
  }

  fillCartTable() {
    //console.log(this.cart)
    this.cart.quantity.forEach(row => {
      this.getMenu(row.menuId).subscribe(
        menu =>  {
          let obj = {
            id: menu["id"],
            label: menu["label"],
            price: menu["priceDF"],
            quantity: row.quantity,
            meals: menu["meals"]
          }
          let found = this.cartTable.find(element => element["id"] == menu["id"]) 
          //console.log(found)
          if(typeof found === 'undefined') this.cartTable.push(obj)
        
      })
    })
  }

  cartMenuLessQuantity(id) {
    //console.log(this.cart)
    this.cart.quantity.forEach(row => {
      if (row.menuId == id) {
        row.quantity--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    })

    this.cartTable.forEach(row => {
      if (row.id == id) {
        //console.log(row)
        row.quantity--;
      }
    })
    
  }

  cartMenuMoreQuantity(id) {
    this.cart.quantity.forEach(row => {
      if (row.menuId == id) {
        row.quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    })

    this.cartTable.forEach(row => {
      if (row.id == id) {
        //console.log(row)
        row.quantity++;
      }
    })
  }

  cartMenuDelete(id) {
    let newCart = this.cart.quantity.filter(row => row.menuId != id) 
    this.cart.quantity = newCart

    let newCartTable = this.cartTable.filter(row => row.id != id)
    this.cartTable = newCartTable;

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getMeal(id) {
    return this.mealService.findById(id)
  }

  getMenu(id) {
    return this.menuService.findById(id)
  }

}
