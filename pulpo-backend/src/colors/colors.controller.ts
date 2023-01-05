import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  findAll(): Promise<Color[]> {
    return this.colorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Color> {
    return this.colorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateColorDto: UpdateColorDto): Promise<Color> {
    return this.colorsService.update(id, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.colorsService.remove(id);
  }
}
