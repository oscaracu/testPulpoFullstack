import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclesServiceService } from '../services/vehicles-service.service';
import { VehicleForm } from '../vehicle-form/vehicleForm';

@Component({
  selector: 'app-vehicle-creation',
  templateUrl: './vehicle-creation.component.html',
  styleUrls: ['./vehicle-creation.component.css'],
})
export class VehicleCreationComponent {
  success: boolean = false;

  constructor(
    private router: Router,
    private vehicleService: VehiclesServiceService
  ) {}

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  createVehicle(vehicle: VehicleForm): void {
    this.vehicleService.createVehicle(vehicle).subscribe((vehicle) => {
      this.success = !this.success;
      console.log(vehicle);
    });
  }
}
