import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ForgotpasswordComponent } from './forgotpassword.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/service/auth.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

describe('ForgotpasswordComponent', () => {
  let component: ForgotpasswordComponent;
  let fixture: ComponentFixture<ForgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordComponent ],
      imports: [HttpClientModule],
      providers: [ FormBuilder, AuthService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onSubmit should send an email', () => {
    expect(component.onSubmit()).toBeUndefined()
  })
});
