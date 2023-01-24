import { Role } from 'src/roles/entities/role.entity';

export interface Payload {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}
