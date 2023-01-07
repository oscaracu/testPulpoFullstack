import { Module } from '@nestjs/common';
import { NoveltiesService } from './novelties.service';
import { NoveltiesController } from './novelties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novelty } from './entities/novelty.entity';
import { NoveltiesCategory } from 'src/novelties-categories/entities/novelties-category.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Novelty, NoveltiesCategory, Vehicle])],
  controllers: [NoveltiesController],
  providers: [NoveltiesService],
})
export class NoveltiesModule {}
