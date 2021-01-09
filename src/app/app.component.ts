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
  today = new Date();
  weekNumber : number;

  constructor(){ }

  ngOnInit(){
    
  }

}
