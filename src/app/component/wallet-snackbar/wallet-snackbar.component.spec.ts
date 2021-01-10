import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { WalletSnackbarComponent } from './wallet-snackbar.component';
import { MatSnackBarRef } from '@angular/material/snack-bar';

describe('WalletSnackbarComponent', () => {
  let component: WalletSnackbarComponent;
  let fixture: ComponentFixture<WalletSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletSnackbarComponent ],
      providers: [ {provide: MatSnackBarRef, useValue: {}} ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
