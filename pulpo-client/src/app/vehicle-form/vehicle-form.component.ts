import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Color } from '../models/color';
import { Maker } from '../models/maker';
import { Vehicle } from '../models/vehicle';
import { VehiclesServiceService } from '../services/vehicles-service.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
})
export class VehicleFormComponent implements OnInit {
  @Input() currentVehicleData!: Vehicle;
  @Input() formTitle!: string;
  @Output() newVehicleData = new EventEmitter();
  @Output() backButton = new EventEmitter();

  colors!: Color[];
  makers!: Maker[];

  make!: number;
  model!: number;
  color!: number;
  admissionDate!: string;
  isActive!: boolean;
  isAssigned!: boolean;

  vehicleForm = new FormGroup({
    make: new FormControl(0, Validators.required),
    model: new FormControl(0, Validators.required),
    color: new FormControl(0, Validators.required),
    admissionDate: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    isAssigned: new FormControl(false),
  });

  constructor(private vehiclesService: VehiclesServiceService) {}

  ngOnInit(): void {
    this.getOptionsLists();

    if (this.currentVehicleData) {
      this.vehicleForm.setValue({
        make: this.currentVehicleData.make.id,
        model: this.currentVehicleData.model,
        color: this.currentVehicleData.color.id,
        admissionDate: this.currentVehicleData.admissionDate,
        isActive: this.currentVehicleData.isActive,
        isAssigned: this.currentVehicleData.isAssigned,
      });
    }
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
    this.newVehicleData.emit(this.vehicleForm.value);
    this.vehicleForm.reset({
      make: 0,
      model: 0,
      color: 0,
      isActive: true,
      isAssigned: false,
    });
  }

  goBack(): void {
    this.backButton.emit();
  }
}
