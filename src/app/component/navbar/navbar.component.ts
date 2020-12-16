import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/service/token-storage.service';


declare interface RouteInfo {
  path: string;
  title: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/accueil', title: 'Accueil'},
  {path: '/menus', title: 'Menus'},
  {path: '/login', title: 'Login'},
  {path: '/admin', title: 'Admin'},

]

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  currentUser: any;

  navItems: any[];

  constructor(private token_service: TokenStorageService) { }

  ngOnInit(): void {

    if (this.currentUser) {
      this.currentUser = this.token_service.getUser().user;
    }
    this.navItems = ROUTES.filter(navItem => navItem);
  }

  logout() {
    this.token_service.signOut();
    window.location.reload();
  }

}
