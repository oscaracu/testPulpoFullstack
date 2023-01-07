import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoveltiesCategoryDto } from './dto/create-novelties-category.dto';
import { UpdateNoveltiesCategoryDto } from './dto/update-novelties-category.dto';
import { NoveltiesCategory } from './entities/novelties-category.entity';

@Injectable()
export class NoveltiesCategoriesService {
  constructor(
    @InjectRepository(NoveltiesCategory)
    private noveltiesCategoryRepository: Repository<NoveltiesCategory>,
  ) {}

  create(
    createNoveltiesCategoryDto: CreateNoveltiesCategoryDto,
  ): Promise<NoveltiesCategory> {
    const noveltyCategory = new NoveltiesCategory();
    noveltyCategory.name = createNoveltiesCategoryDto.name;
    return this.noveltiesCategoryRepository.save(noveltyCategory);
  }

  findAll(): Promise<NoveltiesCategory[]> {
    return this.noveltiesCategoryRepository.find();
  }

  findOne(id: number): Promise<NoveltiesCategory> {
    return this.noveltiesCategoryRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateNoveltiesCategoryDto: UpdateNoveltiesCategoryDto,
  ): Promise<NoveltiesCategory> {
    const noveltyCategoryToUpdate =
      await this.noveltiesCategoryRepository.findOneBy({ id });
    noveltyCategoryToUpdate.name = updateNoveltiesCategoryDto.name;
    return this.noveltiesCategoryRepository.save(noveltyCategoryToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.noveltiesCategoryRepository.delete(id);
  }
}
