import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MenusComponent } from './menus.component';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { element } from 'protractor';

describe('MenusComponent', () => {
  let component: MenusComponent;
  let fixture: ComponentFixture<MenusComponent>;
  let cantiniereService : CantiniereServiceService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusComponent ],
      imports: [HttpClientModule],
      providers: [ CantiniereServiceService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusComponent);
    component = fixture.componentInstance;
    cantiniereService = TestBed.get(CantiniereServiceService)
    //fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component, 'getWeekMeals')

    fixture.detectChanges()

    expect(component).toBeTruthy();
    expect(component.getWeekMeals).toHaveBeenCalled()
  });

  it('#getWeekMeals should get all meals available this week', async() => {
    //fixture.detectChanges();
    await component.getWeekMeals()
    cantiniereService.getWeekMeal().then(data => {
      expect(component.listeMenus).toEqual(data)
    })
    
  })

  it('#getImageMeal should assign an image to a meal', async() => {
    //fixture.detectChanges()

    //await component.getWeekMeals()
    cantiniereService.getImageMeal(1).then(data => {
      component.listeMenus.forEach(element => {
        if(element.id == 1) {
          expect(element.imageId).toEqual(data.id)
        } 
      })
    })
  })

  it('#getWeekMenus should get all menus available this week', async() => {
    spyOn(component, 'getImageMenu')
    spyOn(component, 'getImageMeal')

    
   //fixture.detectChanges();
    await component.getWeekMenus()
    
    cantiniereService.getWeekMenus().then(data => {
      expect(component.listeMenus).toEqual(data)
    })
    expect(component.getImageMenu).toHaveBeenCalled()
    expect(component.getImageMeal).toHaveBeenCalled()
    
  })

  it('#getImageMenu should assign an image to a menu', async() => {
    //fixture.detectChanges()

    await component.getImageMenu(1)
    cantiniereService.getImageMenus(2).then(data => {
      component.listeMenus.forEach(element => {
        if(element.id == 1) {
          expect(element.img).toEqual(data.image64)
        } 
      })
    })
  })

  

  
});
