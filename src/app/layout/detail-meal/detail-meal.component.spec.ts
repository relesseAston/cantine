import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DetailMealComponent } from './detail-meal.component';
import { CartComponent } from '../cart/cart.component';
import { IngredientService } from 'src/service/ingredient.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

describe('DetailMealComponent', () => {
  let component: DetailMealComponent;
  let fixture: ComponentFixture<DetailMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMealComponent ],
      providers: [ IngredientService, CartComponent, {provide: ActivatedRoute, useValue: {
        snapshot: {
          paramMap: {
            get: () => 1, // represents the mealId
          },
        }
      }
    }, HttpClient, HttpHandler, MatSnackBar, Overlay ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
