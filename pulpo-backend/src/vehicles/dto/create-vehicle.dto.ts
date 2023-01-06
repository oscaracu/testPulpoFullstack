import { Color } from "src/colors/entities/color.entity";
import { Maker } from "src/makers/entities/maker.entity";
import { Novelty } from "src/novelties/entities/novelty.entity";

export class CreateVehicleDto {
    make: Maker;
    model: number;
    color: Color;
    admissionDate: string;
    isActive: boolean;
    isAssigned: boolean;
    novelties?: Novelty[];
}
