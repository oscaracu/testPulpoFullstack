import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../color';
import { NoveltiesCategories } from '../novelties-categories';
import { Novelty } from '../novelty';
import { Vehicle } from '../vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehiclesServiceService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicles/${id}`);
  }

  getVehicles(searchQuery: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles?${searchQuery}`);
  }

  updateVehicle(id: number, vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.apiUrl}/vehicles/${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.apiUrl}/vehicles/${id}`);
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.apiUrl}/colors`);
  }

  addNovelty(
    vehicleId: number,
    novelty: Partial<Novelty>
  ): Observable<Vehicle> {
    return this.http.post<Vehicle>(
      `${this.apiUrl}/vehicles/${vehicleId}/novelties`,
      novelty
    );
  }

  getNoveltiesCategories(): Observable<NoveltiesCategories[]> {
    return this.http.get<NoveltiesCategories[]>(
      `${this.apiUrl}/novelties-categories/`
    );
  }
}
