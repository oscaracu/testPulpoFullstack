import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MakersService } from './makers.service';
import { CreateMakerDto } from './dto/create-maker.dto';
import { UpdateMakerDto } from './dto/update-maker.dto';
import { Maker } from './entities/maker.entity';

@Controller('makers')
export class MakersController {
  constructor(private readonly makersService: MakersService) {}

  @Post()
  create(@Body() createMakerDto: CreateMakerDto): Promise<Maker> {
    return this.makersService.create(createMakerDto);
  }

  @Get()
  findAll(): Promise<Maker[]> {
    return this.makersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Maker> {
    return this.makersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMakerDto: UpdateMakerDto): Promise<Maker> {
    return this.makersService.update(+id, updateMakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.makersService.remove(+id);
  }
}
