import { Novelty } from 'src/novelties/entities/novelty.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NoveltiesCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Novelty, (novelty) => novelty.noveltiesCategory)
  public novelties!: Novelty[];
}
