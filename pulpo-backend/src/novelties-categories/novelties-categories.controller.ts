import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoveltiesCategoriesService } from './novelties-categories.service';
import { CreateNoveltiesCategoryDto } from './dto/create-novelties-category.dto';
import { UpdateNoveltiesCategoryDto } from './dto/update-novelties-category.dto';

@Controller('novelties-categories')
export class NoveltiesCategoriesController {
  constructor(private readonly noveltiesCategoriesService: NoveltiesCategoriesService) {}

  @Post()
  create(@Body() createNoveltiesCategoryDto: CreateNoveltiesCategoryDto) {
    return this.noveltiesCategoriesService.create(createNoveltiesCategoryDto);
  }

  @Get()
  findAll() {
    return this.noveltiesCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noveltiesCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoveltiesCategoryDto: UpdateNoveltiesCategoryDto) {
    return this.noveltiesCategoriesService.update(+id, updateNoveltiesCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noveltiesCategoriesService.remove(+id);
  }
}
