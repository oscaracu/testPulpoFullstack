import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  name: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  roles: Role[];
}
