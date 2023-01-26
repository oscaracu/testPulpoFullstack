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

  @ManyToOne(() => Maker, (maker) => maker.vehicle)
  make: Maker;

  @Column()
  model: number;

  @ManyToOne(() => Color, (color) => color.vehicle)
  color: Color;

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
