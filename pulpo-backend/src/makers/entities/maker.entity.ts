import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Maker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Vehicle, vehicle => vehicle.make)
    vehicle: Vehicle[];
}
