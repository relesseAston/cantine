import { Component, OnInit } from '@angular/core';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  listeMenus = [];

  constructor(private cantiniere_api : CantiniereServiceService) { }

  ngOnInit(): void {
    this.getWeekMenus();
  }

  async getWeekMenus(){
    const response = await this.cantiniere_api.getWeekMenus();
    this.listeMenus = response;
    console.log(this.listeMenus);
    this.listeMenus.forEach(element => {
      this.getImageMenu(element.id);
    });
  }

  async getImageMenu(id_menu) {
    const response = await this.cantiniere_api.getImageMenus(id_menu);
    this.listeMenus.forEach(element => {
      if(element.imageId === response.id){
        element.img = response.image64;
      }
    });
    //console.log(this.listeMenus);
  
  }

}
