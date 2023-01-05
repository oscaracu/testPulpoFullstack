import { Module } from '@nestjs/common';
import { NoveltiesService } from './novelties.service';
import { NoveltiesController } from './novelties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novelty } from './entities/novelty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Novelty])],
  controllers: [NoveltiesController],
  providers: [NoveltiesService]
})
export class NoveltiesModule {}
