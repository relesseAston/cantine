import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CartComponent } from './cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { OrderService } from 'src/service/order.service';
import { MealService } from 'src/service/meal.service';
import { UserService } from 'src/service/user.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TokenStorageService } from 'src/service/token-storage.service';
import { MatTableModule } from '@angular/material/table';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ MatTableModule ],
      providers: [ MatSnackBar, Overlay, OrderService, MealService, UserService, CantiniereServiceService, TokenStorageService, HttpHandler, HttpClient ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
