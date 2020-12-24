import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { MealService } from 'src/service/meal.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { OrderService } from 'src/service/order.service';
import { TokenStorageService } from 'src/service/token-storage.service';

const EMPTY_CART = []

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
  quantity;

  constructor(
    private orderService:OrderService,
    private mealService:MealService,
    private menuService:CantiniereServiceService,
    private token_service:TokenStorageService 
  ) { 
    if (this.cart = {}) this.cart = EMPTY_CART;
    if (localStorage.getItem('cart')) this.cart = JSON.parse(localStorage.getItem('cart'));
    this.fillCartTable()
  }

  ngOnInit(): void {
        if (localStorage.getItem('cart')) this.cart = JSON.parse(localStorage.getItem('cart'));

  }

  addToCart(menu) {
    this.cart.push(menu)
    this.quantity = this.quantity +1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    //this.fillCartTable();
  }

  order() {
    this.orderService.addOrder({
      userId: this.token_service.getUser().user,
      constraintId: 0,
      quantity: this.cart
    })
  }

  resetCart() {
    this.cart = EMPTY_CART;
  }

  fillCartTable() {
    console.log(this.cart.length)
    this.cart.forEach(row => {
      this.getMeal(row.mealId).subscribe(
        meal =>  {
          let obj = {
            id: meal["id"],
            label: meal["label"],
            price: meal["priceDF"],
            quantity: row.quantity
          }
          let found = this.cartTable.find(element => element["id"] == meal["id"]) 
          //console.log(found)
          if(typeof found === 'undefined') this.cartTable.push(obj)
        
      }) 
      console.log(row)
    })
  }

  cartMenuLessQuantity(id) {
    //console.log(this.cart)
    this.cart.forEach(row => {
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
    this.cart.forEach(row => {
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
    let newCart = this.cart.filter(row => row.menuId != id) 
    this.cart = newCart

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
