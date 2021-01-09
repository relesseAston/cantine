import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OrderService } from 'src/service/order.service';
import { UserService } from 'src/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/service/token-storage.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [ {provide: Router, useValue: {}} , TokenStorageService,FormBuilder, HttpClient, HttpHandler, OrderService, UserService, {provide: ActivatedRoute, useValue: {
        snapshot: {
          paramMap: {
            get: () => 1, // represents the UserId
          },
        }
      }
    } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
