import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginSnackbarComponent } from './login-snackbar.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

describe('LoginSnackbarComponent', () => {
  let component: LoginSnackbarComponent;
  let fixture: ComponentFixture<LoginSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSnackbarComponent ],
      providers: [ {provide: MatSnackBarRef, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
