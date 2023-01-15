import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../color';
import { VehiclesServiceService } from '../services/vehicles-service.service';
import { Vehicle } from '../vehicle';

interface FiltersDropdownState {
  order: boolean;
  sort: boolean;
  show: boolean;
  novelties: boolean;
  [key: string]: boolean;
}

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css'],
})
export class VehiclesListComponent implements OnInit {
  filtersDropdownState: FiltersDropdownState = {
    order: false,
    sort: false,
    show: false,
    novelties: false,
  };

  constructor(private vehicleService: VehiclesServiceService) {}

  vehicles: Vehicle[] = [];
  searchParams: URLSearchParams = new URLSearchParams();
  isLoading: boolean = false;
  searchTerm: string = '';

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.isLoading = true;
    this.vehicleService
      .getVehicles()
      .subscribe((vehicles) => (this.vehicles = vehicles));
    this.isLoading = false;
  }

  orderBy(selection: string): void {
    this.isLoading = true;
    if (this.searchParams.has('order'))
      this.searchParams.set('order', selection);
    else this.searchParams.append('order', selection);
    if (this.searchParams.has('sort')) this.searchParams.set('sort', 'asc');
    else this.searchParams.append('sort', 'asc');
    this.vehicleService
      .searchVehicles(this.searchParams.toString())
      .subscribe((vehicles) => (this.vehicles = vehicles));
    this.toggle('order');
    this.isLoading = false;
  }

  sort(selection: string): void {
    this.isLoading = true;
    if (this.searchParams.has('sort')) this.searchParams.set('sort', selection);
    else this.searchParams.append('sort', selection);
    this.vehicleService
      .searchVehicles(this.searchParams.toString())
      .subscribe((vehicles) => (this.vehicles = vehicles));
    this.toggle('sort');
    this.isLoading = false;
  }

  tabFilter(selection: string, value: string): void {
    this.isLoading = true;
    if (this.searchParams.has(selection))
      this.searchParams.set(selection, value);
    else this.searchParams.append(selection, value);
    this.vehicleService
      .searchVehicles(this.searchParams.toString())
      .subscribe((vehicles) => (this.vehicles = vehicles));
    this.isLoading = false;
  }

  tabReset(): void {
    this.isLoading = true;
    if (this.searchParams.has('isActive')) this.searchParams.delete('isActive');
    if (this.searchParams.has('isAssigned'))
      this.searchParams.delete('isAssigned');
    this.vehicleService
      .searchVehicles(this.searchParams.toString())
      .subscribe((vehicles) => (this.vehicles = vehicles));
    this.isLoading = false;
  }

  search(input: string): void {
    if (this.searchTerm) {
      this.isLoading = true;
      this.searchParams = new URLSearchParams();
      this.searchParams.append('search', input);
      this.vehicleService
        .searchVehicles(this.searchParams.toString())
        .subscribe((vehicles) => (this.vehicles = vehicles));
      this.searchTerm = '';
      this.isLoading = false;
    } else {
      this.getVehicles();
      this.searchParams = new URLSearchParams();
    }
  }

  reset(): void {
    this.searchParams = new URLSearchParams();
    this.getVehicles();
  }

  toggle(filter: string) {
    this.filtersDropdownState[filter] = !this.filtersDropdownState[filter];
  }
}
