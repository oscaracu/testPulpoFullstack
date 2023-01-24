import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  currentRole!: string;

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const validRoles = route.data['validRoles'];
    this.currentRole = this.tokenService.isAdmin() ? 'admin' : 'user';
    if (
      !this.tokenService.isLogged() ||
      validRoles.indexOf(this.currentRole) < 0
    ) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
