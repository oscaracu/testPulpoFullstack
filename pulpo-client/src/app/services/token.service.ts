import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): any {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token?.split('.')[1];
    const values = atob(payload ? payload : '');
    const valuesJson = JSON.parse(values);
    const username = valuesJson.username;
    return username;
  }

  logOut(): void {
    localStorage.clear();
  }
}
