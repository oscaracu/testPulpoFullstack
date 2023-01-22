import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Payload } from './payload/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email: username }],
    });
    if (!user) return new UnauthorizedException();
    const validPassword = await compare(password, user.password);
    if (!validPassword) return new UnauthorizedException();
    const payload: Payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
