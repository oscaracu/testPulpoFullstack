import { Component } from '@angular/core';

interface Menus {
  navLink: boolean;
  userOptions: boolean;
  [key: string]: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menus: Menus = {
    navLink: false,
    userOptions: false,
  };

  constructor() {}

  toggle(menu: string) {
    this.menus[menu] = !this.menus[menu];
  }
}
