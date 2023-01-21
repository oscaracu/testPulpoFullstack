import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const exists = this.rolRepository.findOne({
      where: { name: createRoleDto.name },
    });

    if (exists)
      throw new BadRequestException(`${createRoleDto.name} ya existe`);

    const newRole = this.rolRepository.create(createRoleDto);
    return this.rolRepository.save(newRole);
  }

  findAll() {
    return this.rolRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} role`;
  // }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
