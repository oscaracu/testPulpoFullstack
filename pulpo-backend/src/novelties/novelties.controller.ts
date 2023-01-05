import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoveltiesService } from './novelties.service';
import { CreateNoveltyDto } from './dto/create-novelty.dto';
import { UpdateNoveltyDto } from './dto/update-novelty.dto';
import { Novelty } from './entities/novelty.entity';

@Controller('novelties')
export class NoveltiesController {
  constructor(private readonly noveltiesService: NoveltiesService) {}

  @Post()
  create(@Body() createNoveltyDto: CreateNoveltyDto): Promise<Novelty> {
    return this.noveltiesService.create(createNoveltyDto);
  }

  @Get()
  findAll(): Promise<Novelty[]> {
    return this.noveltiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Novelty> {
    return this.noveltiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoveltyDto: UpdateNoveltyDto): Promise<Novelty> {
    return this.noveltiesService.update(+id, updateNoveltyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noveltiesService.remove(+id);
  }
}
