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
    private makersRepository: Repository<Maker>,
  ) {}

  create(createMakerDto: CreateMakerDto): Promise<Maker> {
    const maker = new Maker();
    maker.name = createMakerDto.name;
    return this.makersRepository.save(maker);
  }

  async findAll(): Promise<Maker[]> {
    return await this.makersRepository.find({ order: { name: 'ASC' } });
  }

  findOne(id: number): Promise<Maker> {
    return this.makersRepository.findOneBy({ id: id });
  }

  async update(id: number, updateMakerDto: UpdateMakerDto): Promise<Maker> {
    const makerToUpdate = await this.makersRepository.findOneBy({ id: id });
    makerToUpdate.name = updateMakerDto.name;
    return this.makersRepository.save(makerToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.makersRepository.delete(id);
  }
}
