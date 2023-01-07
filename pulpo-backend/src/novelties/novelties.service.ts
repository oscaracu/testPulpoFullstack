import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoveltyDto } from './dto/create-novelty.dto';
import { UpdateNoveltyDto } from './dto/update-novelty.dto';
import { Novelty } from './entities/novelty.entity';

@Injectable()
export class NoveltiesService {
  constructor(
    @InjectRepository(Novelty)
    private noveltiesRepository: Repository<Novelty>,
  ) {}

  async create(createNoveltyDto: CreateNoveltyDto): Promise<Novelty> {
    const novelty = new Novelty();
    novelty.description = createNoveltyDto.description;
    return await this.noveltiesRepository.save(novelty);
  }

  async findAll(): Promise<Novelty[]> {
    return await this.noveltiesRepository.find();
  }

  async findOne(id: number): Promise<Novelty> {
    return await this.noveltiesRepository.findOneBy({ noveltyId: id });
  }

  async update(
    id: number,
    updateNoveltyDto: UpdateNoveltyDto,
  ): Promise<Novelty> {
    const noveltyToUpdate = await this.noveltiesRepository.findOneBy({
      noveltyId: id,
    });
    noveltyToUpdate.description = updateNoveltyDto.description;
    return await this.noveltiesRepository.save(noveltyToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.noveltiesRepository.delete(id);
  }
}
