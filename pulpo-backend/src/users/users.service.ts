import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, roles } = createUserDto;

    for (const rol of roles) {
      const { id, name } = rol;
      const exist = await this.rolesRepository.findOne({
        where: { id, name },
      });
      if (!exist) throw new BadRequestException(`rol no válido`);
    }

    const exists = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (exists && exists.username === username)
      throw new BadRequestException(`${username} ya existe`);
    if (exists && exists.email === email)
      throw new BadRequestException(`${email} ya existe`);

    const newUser = await this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
