import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CartComponent } from './cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { OrderService } from 'src/service/order.service';
import { MealService } from 'src/service/meal.service';
import { UserService } from 'src/service/user.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { TokenStorageService } from 'src/service/token-storage.service';
import { MatTableModule } from '@angular/material/table';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let orderService: OrderService;
  let mealService: MealService;
  let cantiniereService: CantiniereServiceService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ MatTableModule, HttpClientModule ],
      providers: [ MatSnackBar, Overlay, OrderService, MealService, UserService, CantiniereServiceService, TokenStorageService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    orderService = TestBed.get(OrderService)
    userService = TestBed.get(UserService)
    mealService = TestBed.get(MealService)
    cantiniereService = TestBed.get(CantiniereServiceService)
    fixture.detectChanges();
  });

  const mockCart = {
    quantity: 2,
    menuId: null,
    mealId: 1
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#resetCart should make the cart empty', async() => {
    await component.resetCart();

    expect(component.cart).toEqual([])
  })

  it('#addToCart should add meal in the cart', async() => {
    await component.addToCart(mockCart);

    expect(component.cart).toEqual([mockCart])
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([mockCart])
  })

  it('#fillCartTable should fill the table\'s data', async() => {
    spyOn(component, 'getMeal')
    spyOn(component, 'getTotalPrice')

    expect(component.cartTable.length).toBeGreaterThanOrEqual(0)
    if(component.cartTable.length > 0) expect(component.getMeal).toHaveBeenCalled()
    if(component.cartTable.length > 0) expect(component.getTotalPrice).toHaveBeenCalled()
  })

  it('#cartMenuLessQuantity should do cart.quantity - 1', async() => {
    spyOn(component, 'getTotalPrice');
    
    await component.cartMenuLessQuantity(1)

    for (let i = 0; i < component.cart.length; i++) {
      const row = component.cart[i];
      if (row.mealId == 1) {
        expect(row.quantity).toEqual(mockCart.quantity -1)
      }
    }

    expect(component.getTotalPrice).toHaveBeenCalled()
  })

  it('#cartMenuMoreQuantity should do cart.quantity + 1', async() => {
    spyOn(component, 'getTotalPrice');
    
    await component.cartMenuMoreQuantity(1)

    for (let i = 0; i < component.cart.length; i++) {
      const row = component.cart[i];
      if (row.mealId == 1) {
        expect(row.quantity).toEqual(mockCart.quantity)
      }
    }

    expect(component.getTotalPrice).toHaveBeenCalled()
  })

  it('#cartMenuDelete should delete element from cart', async() => {
    spyOn(component, 'getTotalPrice');
    
    await component.cartMenuDelete(1)

    let newCart = component.cart.filter(row => row.mealId != 1) 

    expect(component.cart).toEqual(newCart)
    
    expect(component.getTotalPrice).toHaveBeenCalled()
  })

  it('#getTotalPrice should return the total price', async() => {  
    await component.getTotalPrice()

    expect(component.cartTotal).toEqual(0)
  })

  it('#getUserWallet should return the user\'s wallet', () => {
    userService.getUserById(1).then(data => {
      expect(component.userWallet).toEqual(data.wallet)
    })
  })

  it('#getMeal should return a specific meal', async() => {
    mealService.findById(1).subscribe(data => {
      expect(component.getMeal(1)).toEqual(data)
    })
  })

  it('#getMenu should return a specific menu', async() => {
    cantiniereService.findById(1).subscribe(data => {
      expect(component.getMenu(1)).toEqual(data)
    })
  })

});
