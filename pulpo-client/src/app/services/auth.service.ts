import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/login.dto';
import { TokenDto } from '../models/token.dto';
import { VehiclesServiceService } from './vehicles-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl!: string;

  constructor(
    private vehicleService: VehiclesServiceService,
    private http: HttpClient
  ) {
    this.apiUrl = this.vehicleService.apiUrl;
  }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginDto);
  }

  refresh(tokenDto: TokenDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/refresh`, tokenDto);
  }
}
