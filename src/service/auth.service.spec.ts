import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ ]
    });
    service = TestBed.inject(AuthService);
  });

  const credentials = {
    email: 'toto@gmail.com',
    password: 'Bonjour'
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should logged the user', () => {
    service.login(credentials).then(data => {
      expect(data.headers.get('Authorization').split('Bearer').pop()).toBe(true);
    })
  })

  it('#forgotPassword should send an email to the user', () => {
    service.forgotPassword(credentials).subscribe(data => {
      expect(data).toEqual({})
    })
  })
});
