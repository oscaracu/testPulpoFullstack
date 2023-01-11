import { Component } from '@angular/core';

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
export class VehiclesListComponent {
  filtersDropdownState: FiltersDropdownState = {
    order: false,
    sort: false,
    show: false,
    novelties: false,
  };

  constructor() {}

  toggle(filter: string) {
    this.filtersDropdownState[filter] = !this.filtersDropdownState[filter];
  }
}
