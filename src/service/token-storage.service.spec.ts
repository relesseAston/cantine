import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
  });

  const token_key = 'auth-token';
  const user_key = 'auth-user'; 
  const mockUser = {
    user: {
      id: 1,
      address: '19 RUE DE CALVAS',
      wallet: 2.98,
      postalCode: 59492,
      registrationDate:[2020,7,12,11,4,1],
      email: 'toto@gmail.com',
      isLunchLady:true,
      name: 'Dumas',
      firstname: 'Jean',
      phone: '9874140599',
      town: 'HOYMILLE',
      sex:2,
      status:0,
      imageId:1
    },
    roles:['ROLE_LUNCHLADY'],
    iss: 'secure-api',
    aud: 'secure-app',sub: 'toto@gmail.com',
    exp: '1610356849'
  }
  const token = 'eyJ1c2VyIjp7ImlkIjoxLCJhZGRyZXNzIjoiMTkgUlVFIERFIENBTFZBUyIsIndhbGxldCI6Mi45OCwicG9zdGFsQ29kZSI6IjU5NDkyIiwicmVnaXN0cmF0aW9uRGF0ZSI6WzIwMjAsNywxMiwxMSw0LDFdLCJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaXNMdW5jaExhZHkiOnRydWUsIm5hbWUiOiJEdW1hcyIsImZpcnN0bmFtZSI6IkplYW4iLCJwaG9uZSI6Ijk4NzQxNDA1OTkiLCJ0b3duIjoiSE9ZTUlMTEUiLCJzZXgiOjIsInN0YXR1cyI6MCwiaW1hZ2VJZCI6MX0sInJvbGVzIjpbIlJPTEVfTFVOQ0hMQURZIl0sImlzcyI6InNlY3VyZS1hcGkiLCJhdWQiOiJzZWN1cmUtYXBwIiwic3ViIjoidG90b0BnbWFpbC5jb20iLCJleHAiOjE2MTAzNTY4NDl9'


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#signout should clear the session storage', () => {
    service.signOut()
    expect(window.sessionStorage.length).toEqual(0)
  })

  it('#saveToken should save token in session storage', () => {
    service.saveToken(token)
    expect(window.sessionStorage.getItem(token_key)).toEqual(token)
  })

  it('#getToken should return token save in session storage', () => {
    expect(service.getToken()).toEqual(token);
  })

  it('#saveUser should save user in session storage', () => {
    service.saveUser(mockUser)
    expect(window.sessionStorage.getItem(user_key)).toEqual(JSON.stringify(mockUser))
  })

  it('#getUser should return user save in session storage', () => {
    expect(service.getUser()).toEqual(mockUser);
  })
});
