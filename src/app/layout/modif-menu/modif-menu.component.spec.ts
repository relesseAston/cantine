import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ModifMenuComponent } from './modif-menu.component';
import { ActivatedRoute } from '@angular/router';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { FormBuilder } from '@angular/forms';
import { MealService } from 'src/service/meal.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ModifMenuComponent', () => {
  let component: ModifMenuComponent;
  let fixture: ComponentFixture<ModifMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifMenuComponent ],
      providers: [{provide: ActivatedRoute, useValue: {
        snapshot: {
          paramMap: {
            get: () => 1, // represents the menuId
          },
        }
      }
    }, CantiniereServiceService, FormBuilder, MealService, HttpHandler, HttpClient ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
