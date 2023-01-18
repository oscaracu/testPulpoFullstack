import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Color } from '../color';
import { Maker } from '../maker';
import { VehiclesServiceService } from '../services/vehicles-service.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
})
export class VehicleFormComponent implements OnInit {
  colors!: Color[];
  makers!: Maker[];

  make!: number;
  model!: number;
  color!: number;
  admissionDate!: string;
  isActive!: boolean;
  isAssigned!: boolean;

  vehicleForm = new FormGroup({
    make: new FormControl(this.make || '', Validators.required),
    model: new FormControl(this.model || '', Validators.required),
    color: new FormControl(this.color || '', Validators.required),
    admissionDate: new FormControl(
      this.admissionDate || '',
      Validators.required
    ),
    isActive: new FormControl(this.isActive || true),
    isAssigned: new FormControl(this.isAssigned || false),
  });

  constructor(private vehiclesService: VehiclesServiceService) {}

  ngOnInit(): void {
    this.getOptionsLists();
  }

  getOptionsLists(): void {
    this.vehiclesService
      .getColors()
      .subscribe((colors) => (this.colors = colors));
    this.vehiclesService
      .getMakers()
      .subscribe((makers) => (this.makers = makers));
  }

  models(): number[] {
    const today = new Date();
    let year = today.getFullYear() + 1;
    const models = [];

    for (let i = 0; i < 50; i++) {
      models.push(year);
      year--;
    }

    return models;
  }

  onSave() {
    console.log(this.vehicleForm.value);
  }
}
