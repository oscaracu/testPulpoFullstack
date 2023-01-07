import { Module } from '@nestjs/common';
import { NoveltiesCategoriesService } from './novelties-categories.service';
import { NoveltiesCategoriesController } from './novelties-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoveltiesCategory } from './entities/novelties-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoveltiesCategory])],
  controllers: [NoveltiesCategoriesController],
  providers: [NoveltiesCategoriesService],
})
export class NoveltiesCategoriesModule {}
