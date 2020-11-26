import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/accueil', title: 'Accueil'},
  {path: '/menus', title: 'Menus'},
  {path: '/login', title: 'Login'}

]

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  navItems: any[];

  constructor() { }

  ngOnInit(): void {
    this.navItems = ROUTES.filter(navItem => navItem);
  }

}
