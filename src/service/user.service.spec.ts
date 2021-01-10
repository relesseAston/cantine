import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { TokenStorageService } from './token-storage.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ {provide:HttpHeaders, useValue: {} }, TokenStorageService ]
    });
    service = TestBed.inject(UserService);
  });

  const mockProfileForm = {
    name: 'Albert',
    firstname: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    town: '',
    wallet: '',
    password: [''],
    sex: '',
    isLunchLady: '',
  }

  const img = {
    imagePath: '',
    image64: "data:image/jpeg;base64"
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllUsers should returned Users', async() => {
    service.getAllUser().then(data => {
      expect(data.length).toBeGreaterThan(0)
    }).catch(error => {
      expect(error.status).toEqual(401)
    });
  }) 

  it('#getUserById should return with specificall Id', async() => {
    service.getUserById(1).then(data => {
      expect(data.id).toEqual(1);
    })
  })

  it('#getImgUser should return user\'s img', async() => {
    service.getImgUser(1).then(data => {
      expect(data).toBe(true);
      expect(data.imgPath.length).toBeGreaterThan(0);
    })
  })

  it('#updateProfile should patch user\'s profile', () => {
    service.updateProfile(1, JSON.stringify(mockProfileForm)).then(data => {
      expect(data.name).toEqual(mockProfileForm.name);
    })
  })

  it('#setInscription should register a new user', () => {
    service.setInscription(mockProfileForm).subscribe(data => {
      expect(data.name).toEqual(mockProfileForm.name)
    })
  })

  it('#updateImage shoul patch user\'s image', async() => {
    service.updateImage(JSON.stringify(img),1).then(data => {
      expect(data.id).toEqual(1)
    })
  })
});
