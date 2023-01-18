export interface VehicleForm {
  make: number;
  model: number;
  color: number;
  admissionDate: string;
  isActive: boolean;
  isAssigned: boolean;
  [key: string]: any;
}
