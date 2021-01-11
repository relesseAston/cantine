import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ModifMealComponent } from './modif-meal.component';
import { ActivatedRoute } from '@angular/router';
import { MealService } from 'src/service/meal.service';
import { IngredientService } from 'src/service/ingredient.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

describe('ModifMealComponent', () => {
  let component: ModifMealComponent;
  let fixture: ComponentFixture<ModifMealComponent>;
  let mealService: MealService;
  let cantiniereService: CantiniereServiceService;
  let ingredientService: IngredientService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifMealComponent ],
      imports: [HttpClientModule],
      providers: [ {provide: ActivatedRoute, useValue: {
        snapshot: {
          paramMap: {
            get: () => 1, // represents the bookId
          },
        }
      }
    }, MealService, IngredientService, CantiniereServiceService, FormBuilder ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifMealComponent);
    component = fixture.componentInstance;
    mealService = TestBed.get(MealService)
    cantiniereService = TestBed.get(CantiniereServiceService)
    ingredientService = TestBed.get(IngredientService)
    // fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component, 'getIgrds')
    spyOn(component, 'getMenuById')
    spyOn(component, 'initForm')

    fixture.detectChanges()
    
    expect(component).toBeTruthy();

    expect(component.mealId).toEqual(1)
    expect(component.getIgrds).toHaveBeenCalled()
    expect(component.getMenuById).toHaveBeenCalled()
    expect(component.initForm).toHaveBeenCalled()
  });

  it('#getMenuById should get specific menu', async() => {
    await component.getMenuById(1)

    mealService.findById(1).subscribe(data => {
      expect(component.meal).toEqual(data)
    })
  })

  it('#getImageMeal should get meal\'s image', async() => {
    await component.getMenuById(1)
    //await component.getImageMeal(1)

    cantiniereService.getImageMeal(1).then(data => {
      expect(component.meal.img64).toEqual(data.img64)
      expect(component.meal.imagePath).toEqual(data.imagePath)
    })
  })

});
