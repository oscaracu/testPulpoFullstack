import { IsEnum, IsNotEmpty } from 'class-validator';
import { RolNames } from '../roles.enum';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(RolNames, { message: 'rol no admitido' })
  name: string;
}
