import { Component, OnInit } from '@angular/core';
import { NoveltiesCategories } from '../models/novelties-categories';
import { Vehicle } from '../models/vehicle';
import { TokenService } from '../services/token.service';
import { VehiclesServiceService } from '../services/vehicles-service.service';

// interface FiltersDropdownState {
//   order: boolean;
//   sort: boolean;
//   show: boolean;
//   novelties: boolean;
//   [key: string]: boolean;
// }

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css'],
})
export class VehiclesListComponent implements OnInit {
  // filtersDropdownState: FiltersDropdownState = {
  //   order: false,
  //   sort: false,
  //   show: false,
  //   novelties: false,
  //   color: false,
  // };

  constructor(
    private vehicleService: VehiclesServiceService,
    private tokenService: TokenService
  ) {}

  setColor(colorName: any) {
    const Color: { [x: string]: any } = {
      Azul: 'text-blue-900',
      Blanco: 'text-white',
      Gris: 'text-gray-500',
      Negro: 'text-black',
      Plata: 'text-slate-300',
    };
    return Color[colorName];
  }

  vehicles!: Vehicle[];
  noveltiesCategories!: NoveltiesCategories[];
  searchParams: URLSearchParams = new URLSearchParams();
  searchTerm: string = '';
  isAdmin!: boolean | null;

  colors!: string[];
  makes!: string[];
  models!: string[];

  currentVehicles!: Vehicle[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageItems: number = 5;

  showFilters: boolean = false;

  ngOnInit(): void {
    this.getVehicles(this.searchParams.toString());
    this.getNoveltiesCategories();
    this.isAdmin = this.tokenService.isAdmin();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      const start = this.currentPage * this.pageItems;
      const end = start + this.pageItems;
      this.currentVehicles = this.vehicles.slice(start, end);
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      const start = (this.currentPage - 2) * this.pageItems;
      const end = start + this.pageItems;
      this.currentVehicles = this.vehicles.slice(start, end);
      this.currentPage--;
    }
  }

  getNoveltiesCategories(): void {
    this.vehicleService
      .getNoveltiesCategories()
      .subscribe((categories) => (this.noveltiesCategories = categories));
  }

  getVehicles(input: string): void {
    this.vehicleService.getVehicles(input).subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.generateFiltersLists(vehicles);
      this.totalPages = Math.ceil(vehicles.length / this.pageItems);
      this.currentVehicles = vehicles.slice(0, this.pageItems);
      this.currentPage = 1;
    });
  }

  orderBy(selection: string, sort: string): void {
    if (this.searchParams.has('order'))
      this.searchParams.set('order', selection);
    else this.searchParams.append('order', selection);
    if (!this.searchParams.has('sort')) this.searchParams.append('sort', sort);
    this.searchParams.set('sort', sort);
    this.getVehicles(this.searchParams.toString());
    // this.toggle('order');
  }

  sort(selection: string): void {
    if (this.searchParams.has('sort')) this.searchParams.set('sort', selection);
    else this.searchParams.append('sort', selection);
    this.getVehicles(this.searchParams.toString());
    // this.toggle('sort');
  }

  tabFilter(selection: string, value: string): void {
    if (this.searchParams.has(selection))
      this.searchParams.set(selection, value);
    else this.searchParams.append(selection, value);
    this.getVehicles(this.searchParams.toString());
  }

  filter(type: string, value: string): void {
    if (this.searchParams.has(type)) this.searchParams.set(type, value);
    else this.searchParams.append(type, value);
    this.getVehicles(this.searchParams.toString());
  }

  tabReset(): void {
    if (this.searchParams.has('isActive')) this.searchParams.delete('isActive');
    if (this.searchParams.has('isAssigned'))
      this.searchParams.delete('isAssigned');
    this.getVehicles(this.searchParams.toString());
  }

  search(input: string): void {
    if (input) {
      this.searchParams = new URLSearchParams();
      this.searchParams.append('search', input);
      this.getVehicles(this.searchParams.toString());
      this.searchTerm = '';
    } else {
      this.searchParams = new URLSearchParams();
      this.getVehicles(this.searchParams.toString());
    }
  }

  reset(): void {
    this.searchParams = new URLSearchParams();
    this.getVehicles(this.searchParams.toString());
    console.log(this.searchParams.toString());
  }

  // toggle() {
  //   console.log(this.showFilters);
  //   this.showFilters = !this.showFilters;
  //   console.log(this.showFilters);
  // }

  generateFiltersLists(vehicles: Vehicle[]): void {
    const colorsSet: Set<string> = new Set();
    const makesSet: Set<string> = new Set();
    const modelsSet: Set<string> = new Set();
    vehicles.forEach((vehicle) => {
      colorsSet.add(vehicle.color.name);
      makesSet.add(vehicle.make.name);
      modelsSet.add(vehicle.model.toString());
    });
    this.colors = Array.from(colorsSet).sort();
    this.makes = Array.from(makesSet).sort();
    this.models = Array.from(modelsSet).sort();
  }
}
