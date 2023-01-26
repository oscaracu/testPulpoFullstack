import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { Maker } from '../models/maker';
import { NoveltiesCategories } from '../models/novelties-categories';
import { Novelty } from '../models/novelty';
import { Vehicle } from '../models/vehicle';
import { VehicleForm } from '../vehicle-form/vehicleForm';

@Injectable({
  providedIn: 'root',
})
export class VehiclesServiceService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicles/${id}`);
  }

  getVehicles(searchQuery: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles?${searchQuery}`);
  }

  updateVehicle(
    id: number,
    vehicle: Partial<VehicleForm>
  ): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.apiUrl}/vehicles/${id}`, vehicle);
  }

  createVehicle(vehicle: VehicleForm): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/vehicles`, vehicle);
  }

  deleteVehicle(id: string): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.apiUrl}/vehicles/${id}`);
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.apiUrl}/colors`);
  }

  getMakers(): Observable<Maker[]> {
    return this.http.get<Maker[]>(`${this.apiUrl}/makers`);
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
