import { Component } from '@angular/core';
import { CantiniereServiceService } from '../service/cantiniere-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-cantinere';
  listeMenus = [];

  constructor(private cantiniere_api : CantiniereServiceService){ }

  ngOnInit(){
    this.getMenus();
  }

  async getMenus() {
    const response = await this.cantiniere_api.getMenus();
    this.listeMenus = response;
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
    console.log(this.listeMenus);
  
  }



}
