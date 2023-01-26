import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Color } from 'src/colors/entities/color.entity';
import { Maker } from 'src/makers/entities/maker.entity';
import { Novelty } from 'src/novelties/entities/novelty.entity';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsNumber()
  make: Maker;

  @IsNotEmpty()
  @IsNumber()
  model: number;

  @IsNotEmpty()
  @IsNumber()
  color: Color;

  @IsNotEmpty()
  @IsString()
  admissionDate: string;
  isActive: boolean;
  isAssigned: boolean;
  novelties?: Novelty[];
}
