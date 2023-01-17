import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesServiceService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const vehicleId = Number(routeParams.get('id'));
    this.getVehicle(vehicleId);
  }

  getVehicle(id: number): void {
    this.vehicleService.getVehicle(id).subscribe((vehicle) => {
      this.vehicle = vehicle;
    });
  }
}
