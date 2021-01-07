import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSnackbarComponent } from './wallet-snackbar.component';

describe('WalletSnackbarComponent', () => {
  let component: WalletSnackbarComponent;
  let fixture: ComponentFixture<WalletSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletSnackbarComponent ]
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
