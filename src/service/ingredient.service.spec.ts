import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { IngredientService } from './ingredient.service';
import { TokenStorageService } from './token-storage.service';

describe('IngredientService', () => {
  let service: IngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [{provide:HttpHeaders, useValue: {}}, TokenStorageService]
    });
    service = TestBed.inject(IngredientService);
  });

  const mockIgrd = {
    description: "string",
    label: "string",
    image: {
      imagePath: "img/toto.png",
      image64: "see https://www.base64-image.de/"
    }
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getIgrdImage should return ingredient\'s image', async() => {
    service.getIgrdImage(1).then(data => {
      expect(data).toBe(true)
      expect(data.id).toEqual(1)
    })
  })

  it('#getAllIgrd return all ingredients', async() => {
    service.getAllIgrd().then(data => {
      expect(data).toBe(true)
      expect(data.length).toBeGreaterThan(0)
      expect(data[0].id).toBe(true)
    }).catch(error => {
      expect(error.status).toEqual(401)
    })
  })

  it('#addIgrd add a new ingredient in database', () => {
    service.addIgrd(mockIgrd).then(data => {
      expect(data).toBe(true)
      expect(data.label).toEqual(mockIgrd.label)
    })
  })
});
