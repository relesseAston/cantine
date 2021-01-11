import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/service/auth.service';
import { TokenStorageService } from 'src/service/token-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { UserService } from 'src/service/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let tokenService: TokenStorageService;
  let userService: UserService;
  let auth: AuthService;
  let fb: FormBuilder

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientModule],
      providers: [ AuthService, TokenStorageService, FormBuilder, UserService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    tokenService = TestBed.get(TokenStorageService)
    userService = TestBed.get(UserService)
    auth = TestBed.get(AuthService)
    fb = TestBed.get(FormBuilder)

    //fixture.detectChanges();
  });

  const credentials = {
    email: 'toto@gmail.com',
    password: 'Bonjour'
  }

  it('should create', () => {
    spyOn(component, 'editForm')

    fixture.detectChanges()

    expect(component).toBeTruthy();
    expect(component.editForm).toHaveBeenCalled()
  });

});
