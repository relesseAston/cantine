import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMealComponent } from './detail-meal.component';

describe('DetailMealComponent', () => {
  let component: DetailMealComponent;
  let fixture: ComponentFixture<DetailMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMealComponent ]
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
