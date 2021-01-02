import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSnackbarComponent } from './login-snackbar.component';

describe('LoginSnackbarComponent', () => {
  let component: LoginSnackbarComponent;
  let fixture: ComponentFixture<LoginSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSnackbarComponent ]
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
