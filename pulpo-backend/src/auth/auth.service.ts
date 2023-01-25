import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenDto } from './dto/token.dto';
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

  async refresh(tokenDto: TokenDto): Promise<any> {
    const usuario = await this.jwtService.decode(tokenDto.token);
    const payload: Payload = {
      id: usuario[`id`],
      username: usuario[`username`],
      email: usuario[`email`],
      roles: usuario[`roles`],
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
