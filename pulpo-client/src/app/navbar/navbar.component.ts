import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

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
export class NavbarComponent implements OnInit {
  username?: string;

  menus: Menus = {
    navLink: false,
    userOptions: false,
  };

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
  }

  toggle(menu: string) {
    this.menus[menu] = !this.menus[menu];
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/']);
  }
}
