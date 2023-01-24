import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoveltiesCategories } from '../novelties-categories';
import { Novelty } from '../novelty';
import { TokenService } from '../services/token.service';
import { VehiclesServiceService } from '../services/vehicles-service.service';
import { Vehicle } from '../vehicle';
import { VehicleForm } from '../vehicle-form/vehicleForm';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  vehicle!: Vehicle;
  noveltiesCategories!: NoveltiesCategories[];
  delete: boolean = false;
  isAdmin!: boolean | null;

  newNovelty = new FormGroup({
    noveltiesCategoryId: new FormControl(1, { nonNullable: true }),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesServiceService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const vehicleId = Number(routeParams.get('id'));
    this.getVehicle(vehicleId);
    this.getNoveltiesCategories();
    this.isAdmin = this.tokenService.isAdmin();
  }

  getVehicle(id: number): void {
    this.vehicleService.getVehicle(id).subscribe((vehicle) => {
      vehicle === null
        ? this.router.navigate(['/dashboard'])
        : (this.vehicle = vehicle);
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
    const vehicle: Partial<VehicleForm> = { [state]: value };
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
