import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../color';
import { NoveltiesCategories } from '../novelties-categories';
import { Vehicle } from '../vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehiclesServiceService {
  vehiclesUrl = 'http://localhost:3000/vehicles';
  colorsUrl = 'http://localhost:3000/colors/';
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicles/${id}`);
  }

  getVehicles(searchQuery: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.vehiclesUrl}?${searchQuery}`);
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.colorsUrl);
  }

  getNoveltiesCategories(): Observable<NoveltiesCategories[]> {
    return this.http.get<NoveltiesCategories[]>(
      `${this.apiUrl}/novelties-categories/`
    );
  }
}
