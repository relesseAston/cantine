import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CantiniereServiceService } from './cantiniere-service.service';
import { TokenStorageService } from './token-storage.service';

describe('CantiniereServiceService', () => {
  let service: CantiniereServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ {provide:HttpHeaders, useValue: {}}, TokenStorageService ]
    });
    service = TestBed.inject(CantiniereServiceService);
  });

  const mockMenu = {
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
    mealIds: [
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

  it('#getMenus should return all menus', async() => {
    service.getMenus().then(data => {
      expect(data).toBe(true);
      data.forEach(element => {
        expect(element.id).toBeGreaterThan(0)
      });
    }).catch(error => {
      expect(error.status).toEqual(401)
    })
  })

  it('#addMenu should add a new menu in database', async() => {
    service.addMenu(mockMenu).then(data => {
      expect(data).toBe(true)
      expect(data.label).toEqual(mockMenu.label)
    })
  })

  it('#getImageMenu should return the menu\'s image', async() => {
    service.getImageMenus(1).then(data => {
      expect(data.id).toBeGreaterThan(0)
      expect(data.image64).toBe(true)
    })
  })

  it('#getWeekMenus should return all menus available this week', async() => {
    service.getWeekMenus().then(data => {
      data.forEach(element => {
        expect(element.id).toBeGreaterThan(0)
      });
    })
  })

  it('#getWeekMeal should return all meals available this week', async() => {
    service.getWeekMeal().then(data => {
      data.forEach(element => {
        expect(element.id).toBeGreaterThan(0)
      });
    })
  })

  it('#getImageMeal should return meal\'s image', async() => {
    service.getImageMeal(1).then(data => {
      expect(data.id).toBeGreaterThan(0)
    })
  })

  it('#getMealById should return specific meal', async() => {
    service.getMealById(1).then(data => {
      expect(data.id).toEqual(1);
    })
  })

  it('#getMenuById should return specific meal', async() => {
    service.getMenuById(1).then(data => {
      expect(data.id).toEqual(1);
    })
  })

  it('#findById should return specific meal', async() => {
    service.findById(1).subscribe(data => {
      expect(data["id"]).toEqual(1)
    });
  })

  it('#updateMenu should patch a menu', async() => {
    service.updateMenu(1, mockMenu).then(data => {
      expect(data.id).toEqual(1)
      expect(data.label).toEqual(mockMenu.label)
    }).catch(error => {
      expect(error.status).toEqual(401)
    })
  })

  it('#updateMenuImage should patch menu\'s image', async() => {
    service.updateMenuImage(1, img).then(data => {
      expect(data.id).toEqual(1)
    })
  })
});
