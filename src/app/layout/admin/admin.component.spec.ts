import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AdminComponent } from './admin.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/service/order.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WalletService } from 'src/service/wallet.service';
import { UserService } from 'src/service/user.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { MealService } from 'src/service/meal.service';
import { IngredientService } from 'src/service/ingredient.service';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from 'src/app/component/confirm-dialog/confirm-dialog.component';
import { AnimationDriver } from '@angular/animations/browser';
import { TokenStorageService } from 'src/service/token-storage.service';
import { AuthService } from 'src/service/auth.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let orderService: OrderService;
  let walletService: WalletService;
  let mealService: MealService;
  let cantiniereService: CantiniereServiceService;
  let userService: UserService;
  let ingredientService: IngredientService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [HttpClientModule, MatTableModule, MatDialogModule, BrowserAnimationsModule, NoopAnimationsModule ],
      providers: [{provide: Router, useValue: {}}, {provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: {
              get: () => 1, // represents the bookId
            },
          }
        }
      }, OrderService, MatDialog, WalletService, UserService, CantiniereServiceService, MealService, IngredientService, Overlay ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    orderService = TestBed.get(OrderService)
    userService = TestBed.get(UserService)
    walletService = TestBed.get(WalletService)
    mealService = TestBed.get(MealService)
    cantiniereService = TestBed.get(CantiniereServiceService)
    ingredientService = TestBed.get(IngredientService)

    // fixture.detectChanges();
  });

  const credentials = {
    email: 'toto@gmail.com',
    password: 'Bonjour'
  }

  

  it('should create', async() => {
    expect(component).toBeTruthy();

    expect(component.userId).toEqual(1)

    orderService.findAll().subscribe(data => {
      expect(component.commandes_passees).toEqual(data)
    })

    orderService.findTodayOrders().subscribe(data => {
      expect(component.todayOrders).toEqual(data)
    })
  });

  it('#applyFilter should filter users', () => {
    component.applyFilter('test')
    //fixture.detectChanges()

    expect(component.dataSource.data).toEqual(component.usersTab)
    expect(component.dataSource2.data).toEqual(component.commandes_passees)
    expect(component.dataSource.filter).toEqual('test')
    expect(component.dataSource2.filter).toEqual('test')
  })

  it('methods should be called', () => {
    spyOn(component, 'getUsers')
    spyOn(component, 'getAllMenus')
    spyOn(component, 'getAllMeals')

    fixture.detectChanges()

    expect(component.getUsers).toHaveBeenCalled()
    expect(component.getAllMenus).toHaveBeenCalled()
    expect(component.getAllMeals).toHaveBeenCalled()
  })

  it('#getAllMeals should get all users', async() => {
    //fixture.detectChanges()
    
    mealService.findAll().then(data => {
      expect(component.meals).toEqual(data)
    }).catch(error => expect(error["status"]).toEqual(401))
  })

  it('#getAllMenus should get all users', async() => {

    cantiniereService.getMenus().then(data => {
      expect(component.menus).toEqual(data)
    }).catch(error => expect(error["status"]).toEqual(401))
  })

  it('#getUsers should get all users', async() => {
    fixture.detectChanges()
    userService.getAllUser().then(data => {
      expect(component.usersTab).toEqual(component.sortUsersByName(data))
    }).catch(error => expect(error["status"]).toEqual(401))
  })

  

});
