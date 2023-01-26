import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Color } from 'src/colors/entities/color.entity';
import { Maker } from 'src/makers/entities/maker.entity';
import { Novelty } from 'src/novelties/entities/novelty.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @ManyToOne(() => Maker, (maker) => maker.vehicle)
  make: Maker;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  model: number;

  @IsNotEmpty()
  @IsNumber()
  @ManyToOne(() => Color, (color) => color.vehicle)
  color: Color;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'date' })
  admissionDate: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAssigned: boolean;

  @UpdateDateColumn({ type: 'date' })
  updateDate: string;

  @OneToMany((type) => Novelty, (novelty) => novelty.vehicle, { cascade: true })
  public novelties!: Novelty[];
}
