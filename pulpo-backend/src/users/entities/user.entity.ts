import { hash } from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToMany((type) => Role, (rol) => rol.users, { eager: true })
  @JoinTable()
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }
}
