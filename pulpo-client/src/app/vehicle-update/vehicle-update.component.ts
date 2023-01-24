import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesServiceService } from '../services/vehicles-service.service';
import { Vehicle } from '../vehicle';
import { VehicleForm } from '../vehicle-form/vehicleForm';

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrls: ['./vehicle-update.component.css'],
})
export class VehicleUpdateComponent implements OnInit {
  vehicle!: Vehicle;
  initialValues!: VehicleForm;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const vehicleId = Number(routeParams.get('id'));
    this.vehicleService.getVehicle(vehicleId).subscribe((vehicle) => {
      if (vehicle === null) {
        this.router.navigate(['/dashboard']);
      }
      this.vehicle = vehicle;
      this.initialValues = {
        make: vehicle.make.id,
        model: vehicle.model,
        color: vehicle.color.id,
        admissionDate: vehicle.admissionDate,
        isActive: vehicle.isActive,
        isAssigned: vehicle.isAssigned,
      };
    });
  }

  updateVehicle(
    vehicleId: number,
    vehicleFormData: Partial<VehicleForm>
  ): void {
    const changedValues: Partial<VehicleForm> = {};

    Object.keys(vehicleFormData).forEach((key) => {
      if (vehicleFormData[key] !== this.initialValues[key]) {
        changedValues[key] = vehicleFormData[key];
      }
    });

    if (Object.keys(changedValues).length === 0) {
      this.router.navigate(['/dashboard/vehicle-details', vehicleId]);
    } else {
      this.vehicleService
        .updateVehicle(vehicleId, changedValues)
        .subscribe(() => {
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['dashboard/vehicle-details', vehicleId]);
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/vehicle-details', this.vehicle.id]);
  }
}
