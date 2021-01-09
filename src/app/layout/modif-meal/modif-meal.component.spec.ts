import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ModifMealComponent } from './modif-meal.component';
import { ActivatedRoute } from '@angular/router';
import { MealService } from 'src/service/meal.service';
import { IngredientService } from 'src/service/ingredient.service';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

describe('ModifMealComponent', () => {
  let component: ModifMealComponent;
  let fixture: ComponentFixture<ModifMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifMealComponent ],
      providers: [ {provide: ActivatedRoute, useValue: {
        snapshot: {
          paramMap: {
            get: () => 1, // represents the bookId
          },
        }
      }
    }, MealService, IngredientService, CantiniereServiceService, HttpClient, HttpHandler, FormBuilder ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
