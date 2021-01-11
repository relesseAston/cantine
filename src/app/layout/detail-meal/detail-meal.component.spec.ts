import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DetailMealComponent } from './detail-meal.component';
import { CartComponent } from '../cart/cart.component';
import { IngredientService } from 'src/service/ingredient.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { TokenStorageService } from 'src/service/token-storage.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';

describe('DetailMealComponent', () => {
  let component: DetailMealComponent;
  let fixture: ComponentFixture<DetailMealComponent>;
  let cantiniereService: CantiniereServiceService;
  let ingredientService: IngredientService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMealComponent ],
      imports: [ HttpClientModule],
      providers: [CantiniereServiceService, IngredientService, CartComponent, {provide: ActivatedRoute, useValue: {
        snapshot: {
          paramMap: {
            get: () => 1, // represents the mealId
          },
        }
      }
    }, MatSnackBar, Overlay ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMealComponent);
    component = fixture.componentInstance;
    cantiniereService = TestBed.get(CantiniereServiceService)
    ingredientService = TestBed.get(IngredientService)
    // fixture.detectChanges();
  });

  const mockMeal = {
    id: 1,
    description: "string",
    label: "string",
    image: {
      imagePath: "img/toto.png",
      image64: "see https://www.base64-image.de/"
    },
    priceDF: 0,
    availableForWeeks: [
      0
    ],
    ingredientsId: [
      0
    ]
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('methods should be called', () => {
    spyOn(component, 'getMealById')
    spyOn(component, 'getImageMeal')

    fixture.detectChanges()

    expect(component.mealId).toEqual(1)
    expect(component.getMealById).toHaveBeenCalled()
    expect(component.getImageMeal).toHaveBeenCalled()
  })

  it('#getMealById should return specific meal', async() => {
    fixture.detectChanges();
    await component.getMealById()
    cantiniereService.getMealById(component.mealId).then(data => {
      if(data.description == undefined) {
        data.description = "aucune description";
      }
      expect(component.meal).toEqual(data)
    })
  })

 /*  it('#changeQuantity should change the quantity of meals to add to cart', async() => {
    fixture.detectChanges()
    await component.changeQuantity(2)

    expect(component.quantity).toEqual(2)
  }) */

  it('#addToCart should add to cart', async() => {
    fixture.detectChanges()
   // await component.getMealById()
    await component.addToCart()
    expect(JSON.parse(localStorage.getItem('cart'))[0].mealId).toEqual(component.mealId)
  })

  it('#getIgrdImage should get all ingredients\' image', async() => {
    fixture.detectChanges()
    await component.getMealById()
    ingredientService.getIgrdImage(6).then(data => {
      component.meal.ingredients.forEach(element => {
        if(element.imageId == 6) {
          expect(element.img64).toEqual(data.image64);
        }
      })
    })
  })

  it('#getImageMeal should get meal\'s imf', async() => {
    cantiniereService.getImageMeal(1).then(data => {
      expect(component.mealImg64).toEqual(data.img64)
    })
  })
});
