import { Color } from "src/colors/entities/color.entity";
import { Maker } from "src/makers/entities/maker.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Vehicle {
    @PrimaryColumn()
    id: string;

    @ManyToOne(type => Maker, maker => maker.vehicle)
    make: Maker;

    @Column()
    model: number;

    @ManyToOne(type => Color, color => color.vehicle)
    color: Color;

    @Column({type: "date"})
    admissionDate: string;

    @Column({default: true})
    isActive: boolean;

    @Column()
    isAssigned: boolean // Consultar tipo de dato.
}
