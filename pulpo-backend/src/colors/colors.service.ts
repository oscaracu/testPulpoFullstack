import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private colorsRepository: Repository<Color>,
  ) {}

  create(createColorDto: CreateColorDto): Promise<Color> {
    const color = new Color();
    color.name = createColorDto.name;
    return this.colorsRepository.save(color);
  }

  async findAll(): Promise<Color[]> {
    return await this.colorsRepository.find({ order: { name: 'ASC' } });
  }

  findOne(id: number): Promise<Color> {
    return this.colorsRepository.findOneBy({ id: id });
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<Color> {
    const colorToUpdate = await this.colorsRepository.findOneBy({ id: id });
    colorToUpdate.name = updateColorDto.name;
    return this.colorsRepository.save(colorToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.colorsRepository.delete(id);
  }
}
