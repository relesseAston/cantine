import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/service/token-storage.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(private token_service: TokenStorageService, private user_service: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token_service.getUser().user;
    console.log(this.currentUser);
    this.getUserImg();
  }

  async getUserImg() {
    var id_user: number = this.currentUser.id;
    const response = await this.user_service.getImgUser(id_user);
    this.currentUser.image64 = response.image64;
  }

}
