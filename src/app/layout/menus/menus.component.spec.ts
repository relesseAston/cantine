import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MenusComponent } from './menus.component';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MenusComponent', () => {
  let component: MenusComponent;
  let fixture: ComponentFixture<MenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusComponent ],
      providers: [ CantiniereServiceService, HttpClient, HttpHandler ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
