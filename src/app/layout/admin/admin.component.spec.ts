import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AdminComponent } from './admin.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpHandler } from '@angular/common/http';
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

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [MatTableModule, MatDialogModule, BrowserAnimationsModule, NoopAnimationsModule ],
      providers: [ HttpClient, HttpHandler, {provide: Router, useValue: {}}, {provide: ActivatedRoute, useValue: {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
