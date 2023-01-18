import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  noveltiesCategories!: NoveltiesCategories[];
  delete: boolean = false;

  newNovelty = new FormGroup({
    noveltiesCategoryId: new FormControl(1, { nonNullable: true }),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesServiceService,
    private router: Router
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

  onSubmit(): void {
    const novelty: Partial<Novelty> = this.newNovelty.value;
    this.vehicleService
      .addNovelty(this.vehicle.id, novelty)
      .subscribe((vehicle) => (this.vehicle.novelties = vehicle.novelties));

    this.newNovelty.reset();
  }

  updateState(state: string, value: boolean): void {
    const vehicle: Partial<Vehicle> = { [state]: value };
    this.vehicleService
      .updateVehicle(this.vehicle.id, vehicle)
      .subscribe(() => this.getVehicle(this.vehicle.id));
  }

  onDelete(id: string): void {
    this.vehicleService.deleteVehicle(id).subscribe(() => {
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/dashboard']);
    });
  }
}
