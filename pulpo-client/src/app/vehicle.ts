import { Color } from './color';
import { Maker } from './maker';
import { Novelty } from './novelty';

export interface Vehicle {
  id: number;
  make: Maker;
  model: number;
  color: Color;
  admissionDate: string;
  isActive: boolean;
  isAssigned: boolean;
  novelties?: Novelty;
}
