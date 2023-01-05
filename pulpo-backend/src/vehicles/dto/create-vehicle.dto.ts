import { Novelty } from "src/novelties/entities/novelty.entity";

export class CreateVehicleDto {
    make: number;
    model: number;
    color: number;
    admissionDate: string;
    isActive: boolean;
    isAssigned: boolean;
    novelties?: Novelty[];
}
