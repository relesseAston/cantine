import { Component, OnInit } from '@angular/core';
import { CartComponent } from 'src/app/layout/cart/cart.component';
import { TokenStorageService } from 'src/service/token-storage.service';


declare interface Routered {
  path: string;
  title: string;
}

export const ROUTES: Routered[] = [
  {path: '/accueil', title: 'Accueil'},
  {path: '/menus', title: 'Menus'},
  {path: '/login', title: 'Login'}

]

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CartComponent]
})

export class NavbarComponent implements OnInit {

  currentUser: any;
  isLunchLady: Boolean;

  navItems: any[];

  constructor(
    private token_service: TokenStorageService,
    public cart:CartComponent) { }

  ngOnInit(): void {
    if(this.token_service.getUser()) {
      this.currentUser = this.token_service.getUser().user;
      this.isLunchLady = this.currentUser.isLunchLady;
    }
    this.navItems = ROUTES.filter(navItem => navItem);
  }

  logout() {
    this.token_service.signOut();
    window.location.reload();
  }

}
