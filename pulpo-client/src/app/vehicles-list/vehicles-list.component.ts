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
  searchResults: Vehicle[] = [];

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService
      .getVehicles()
      .subscribe((vehicles) => (this.vehicles = vehicles));
  }

  orderBy(selection: string): void {
    if (this.searchParams.has('order'))
      this.searchParams.set('order', selection);
    else this.searchParams.append('order', selection);
    if (this.searchParams.has('sort')) this.searchParams.set('sort', 'asc');
    else this.searchParams.append('sort', 'asc');
    this.vehicleService
      .searchVehicles(this.searchParams.toString())
      .subscribe((vehicles) => (this.vehicles = vehicles));
    this.toggle('order');
  }

  toggle(filter: string) {
    this.filtersDropdownState[filter] = !this.filtersDropdownState[filter];
  }
}
