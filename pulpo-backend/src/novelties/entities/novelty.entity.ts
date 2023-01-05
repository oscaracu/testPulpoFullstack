import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Novelty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @CreateDateColumn()
    createdDate: string;

    @ManyToMany(()=> Vehicle, (vehicle)=> vehicle.novelties)
    vehicles: Vehicle[]
}
