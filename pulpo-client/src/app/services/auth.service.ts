import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../login.dto';
import { VehiclesServiceService } from './vehicles-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private vehicleService: VehiclesServiceService,
    private http: HttpClient
  ) {}

  login(loginDto: LoginDto): Observable<any> {
    const { apiUrl } = this.vehicleService;
    return this.http.post<any>(`${apiUrl}/auth/login`, loginDto);
  }
}
