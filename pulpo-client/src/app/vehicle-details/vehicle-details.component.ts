import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoveltiesCategories } from '../models/novelties-categories';
import { Novelty } from '../models/novelty';
import { Vehicle } from '../models/vehicle';
import { TokenService } from '../services/token.service';
import { VehiclesServiceService } from '../services/vehicles-service.service';
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
  currentNovelties!: Novelty[];

  newNovelty = new FormGroup({
    noveltiesCategoryId: new FormControl(0, { nonNullable: true }),
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
      if (vehicle === null) {
        this.router.navigate(['/dashboard']);
      }
      this.vehicle = vehicle;
      this.currentNovelties = [...vehicle.novelties].reverse();
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
      .subscribe((vehicle) => {
        this.vehicle.novelties = vehicle.novelties;
        this.currentNovelties = vehicle.novelties;
      });

    this.newNovelty.reset({ noveltiesCategoryId: 0 });
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

  filterNovelties(event: Event): void {
    const noveltyCategory = (event.target as HTMLSelectElement).value;

    if (noveltyCategory === '0') {
      this.currentNovelties = [...this.vehicle.novelties];
      this.newNovelty.reset({ noveltiesCategoryId: 0 });
    } else {
      this.currentNovelties = this.vehicle.novelties.filter((novelty) => {
        return novelty.noveltiesCategoryId === +noveltyCategory[0];
      });
    }
  }
}
