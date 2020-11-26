import { Component, OnInit } from '@angular/core';
import { CantiniereServiceService } from 'src/service/cantiniere-service.service';
import { TokenStorageService } from 'src/service/token-storage.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private user_service : UserService) { }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    let resp = await this.user_service.getAllUser();
    console.log(resp)
  }

}
