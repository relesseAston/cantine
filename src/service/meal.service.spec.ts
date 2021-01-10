import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MealService } from './meal.service';
import { TokenStorageService } from './token-storage.service';

describe('MealService', () => {
  let service: MealService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ { provide:HttpHeaders, useValue: {} }, TokenStorageService ]
    });
    service = TestBed.inject(MealService);
  });

  const mockMeal = {
    description: "string",
    label: "string",
    image: {
      imagePath: "img/toto.png",
      image64: "see https://www.base64-image.de/"
    },
    priceDF: 0,
    availableForWeeks: [
      0
    ],
    ingredientsId: [
      0
    ]
  }

  const img = {
    imagePath: '',
    image64: "data:image/jpeg;base64"
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#findById should return meal with id', () => {
    service.findById(1).subscribe(data => {
      expect(data).toBe(true)
      expect(data['id']).toEqual(1)
    })
  })

  it('#findAll should return all meals', async() => {
    service.findAll().then(data => {
      expect(data).toBe(true)
      expect(data.length).toBeGreaterThan(0)
    }).catch(error => {
      expect(error.status).toEqual(401)
    })
  }) 

  it('#addMeal should put a new meal', async() => {
    service.addMeal(mockMeal).then(data => {
      expect(data).toBe(true)
      expect(data.label).toEqual(mockMeal.label)
    })
  })

  it('#updateMeal should patch an existent meal', async() => {
    service.updateMeal(1, mockMeal).then(data => {
      expect(data).toBe(true)
      expect(data.label).toEqual(mockMeal.label)
    })
  })

  it('#updateMealImage should patch a meal\'s image', async() => {
    service.updateMealImage(1, img).then(data => {
      expect(data).toBe(true)
      expect(data.id).toEqual(1)
    })
  })
});
