import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ToolateSnackbarComponent } from './toolate-snackbar.component';
import { MatSnackBarRef } from '@angular/material/snack-bar';

describe('WalletSnackbarComponent', () => {
  let component: ToolateSnackbarComponent;
  let fixture: ComponentFixture<ToolateSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolateSnackbarComponent ],
      providers: [ {provide: MatSnackBarRef, useValue: {}} ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolateSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
