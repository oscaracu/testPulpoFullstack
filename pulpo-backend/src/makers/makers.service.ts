import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMakerDto } from './dto/create-maker.dto';
import { UpdateMakerDto } from './dto/update-maker.dto';
import { Maker } from './entities/maker.entity';

@Injectable()
export class MakersService {
  constructor(
    @InjectRepository(Maker)
    private makersRepository: Repository<Maker>
  ){}

  create(createMakerDto: CreateMakerDto) {
    return 'This action adds a new maker';
  }

  findAll() {
    return `This action returns all makers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maker`;
  }

  update(id: number, updateMakerDto: UpdateMakerDto) {
    return `This action updates a #${id} maker`;
  }

  remove(id: number) {
    return `This action removes a #${id} maker`;
  }
}
