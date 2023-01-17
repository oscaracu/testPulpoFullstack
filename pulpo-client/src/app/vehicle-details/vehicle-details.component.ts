import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoveltiesCategories } from '../novelties-categories';
import { Novelty } from '../novelty';
import { VehiclesServiceService } from '../services/vehicles-service.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  vehicle!: Vehicle;
  noveltiesCategories: NoveltiesCategories[] = [];
  newNovelty = new FormGroup({
    noveltiesCategoryId: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesServiceService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const vehicleId = Number(routeParams.get('id'));
    this.getVehicle(vehicleId);
    this.getNoveltiesCategories();
  }

  getVehicle(id: number): void {
    this.vehicleService.getVehicle(id).subscribe((vehicle) => {
      this.vehicle = vehicle;
    });
  }

  getNoveltiesCategories(): void {
    this.vehicleService
      .getNoveltiesCategories()
      .subscribe((categories) => (this.noveltiesCategories = categories));
  }
}
