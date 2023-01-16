import { Component, OnInit } from '@angular/core';
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
    color: false,
  };

  constructor(private vehicleService: VehiclesServiceService) {}

  vehicles: Vehicle[] = [];
  searchParams: URLSearchParams = new URLSearchParams();
  isLoading: boolean = false;
  searchTerm: string = '';

  colors!: Set<string>;
  makes!: Set<string>;
  models!: Set<string>;

  ngOnInit(): void {
    this.getVehicles(this.searchParams.toString());
  }

  getVehicles(input: string): void {
    this.isLoading = true;
    this.vehicleService.getVehicles(input).subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.generateFiltersLists(vehicles);
    });
    this.isLoading = false;
  }

  orderBy(selection: string): void {
    this.isLoading = true;
    if (this.searchParams.has('order'))
      this.searchParams.set('order', selection);
    else this.searchParams.append('order', selection);
    if (!this.searchParams.has('sort')) this.searchParams.append('sort', 'asc');
    this.getVehicles(this.searchParams.toString());
    this.toggle('order');
    this.isLoading = false;
  }

  sort(selection: string): void {
    this.isLoading = true;
    if (this.searchParams.has('sort')) this.searchParams.set('sort', selection);
    else this.searchParams.append('sort', selection);
    this.getVehicles(this.searchParams.toString());
    this.toggle('sort');
    this.isLoading = false;
  }

  tabFilter(selection: string, value: string): void {
    this.isLoading = true;
    if (this.searchParams.has(selection))
      this.searchParams.set(selection, value);
    else this.searchParams.append(selection, value);
    this.getVehicles(this.searchParams.toString());
    this.isLoading = false;
  }

  filter(type: string, value: string): void {
    this.isLoading = true;
    if (this.searchParams.has(type)) this.searchParams.set(type, value);
    else this.searchParams.append(type, value);
    this.getVehicles(this.searchParams.toString());
    this.isLoading = false;
  }

  tabReset(): void {
    this.isLoading = true;
    if (this.searchParams.has('isActive')) this.searchParams.delete('isActive');
    if (this.searchParams.has('isAssigned'))
      this.searchParams.delete('isAssigned');
    this.getVehicles(this.searchParams.toString());
    this.isLoading = false;
  }

  search(input: string): void {
    if (input) {
      this.isLoading = true;
      this.searchParams = new URLSearchParams();
      this.searchParams.append('search', input);
      this.getVehicles(this.searchParams.toString());
      this.searchTerm = '';
      this.isLoading = false;
    } else {
      this.searchParams = new URLSearchParams();
      this.getVehicles(this.searchParams.toString());
    }
  }

  reset(): void {
    this.searchParams = new URLSearchParams();
    this.getVehicles(this.searchParams.toString());
  }

  toggle(filter: string) {
    this.filtersDropdownState[filter] = !this.filtersDropdownState[filter];
  }

  generateFiltersLists(vehicles: Vehicle[]): void {
    this.colors = new Set();
    this.makes = new Set();
    this.models = new Set();
    vehicles.forEach((vehicle) => {
      this.colors.add(vehicle.color.name);
      this.makes.add(vehicle.make.name);
      this.models.add(vehicle.model.toString());
    });
  }
}
