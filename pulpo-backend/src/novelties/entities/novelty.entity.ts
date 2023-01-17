import { NoveltiesCategory } from 'src/novelties-categories/entities/novelties-category.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Novelty {
  @PrimaryGeneratedColumn()
  public noveltyId!: number;

  @Column()
  public vehicleId!: number;

  @Column()
  public noveltiesCategoryId!: number;

  @Column()
  public description!: string;

  @CreateDateColumn()
  public createdDate!: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.novelties, {
    onDelete: 'CASCADE',
  })
  public vehicle!: Vehicle;

  @ManyToOne(
    () => NoveltiesCategory,
    (noveltiesCategory) => noveltiesCategory.novelties,
    { onDelete: 'CASCADE' },
  )
  public noveltiesCategory!: NoveltiesCategory;
}
