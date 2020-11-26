import { Component, OnInit } from '@angular/core';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { TokenStorageService } from 'src/service/token-storage.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private token_service : TokenStorageService) { }

  ngOnInit(): void {
    let test = this.token_service.getUser();
    console.log(test.user);
    
  }

}
