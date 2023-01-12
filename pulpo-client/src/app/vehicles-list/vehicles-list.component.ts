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
  colors: Color[] = [];

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService
      .getVehicles()
      .subscribe((vehicles) => (this.vehicles = vehicles));
  }

  getColors(): void {
    this.vehicleService
      .getColors()
      .subscribe((colors) => (this.colors = colors));
  }

  toggle(filter: string) {
    this.filtersDropdownState[filter] = !this.filtersDropdownState[filter];
  }
}
