import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../color';
import { Vehicle } from '../vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehiclesServiceService {
  vehiclesUrl = 'http://localhost:3000/vehicles';
  colorsUrl = 'http://localhost:3000/colors/';

  constructor(private http: HttpClient) {}

  getVehicles(searchQuery: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.vehiclesUrl}?${searchQuery}`);
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.colorsUrl);
  }
}
