import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { TokenStorageService } from 'src/service/token-storage.service';
import { CartComponent } from 'src/app/layout/cart/cart.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { OrderService } from 'src/service/order.service';
import { MealService } from 'src/service/meal.service';
import { UserService } from 'src/service/user.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { MatTableModule } from '@angular/material/table';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ MatMenuModule, MatTableModule ],
      providers: [TokenStorageService, CartComponent, HttpHandler, HttpClient, MatSnackBar, Overlay, OrderService, MealService, UserService, CantiniereServiceService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
