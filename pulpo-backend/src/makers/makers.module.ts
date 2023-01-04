import { Module } from '@nestjs/common';
import { MakersService } from './makers.service';
import { MakersController } from './makers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maker } from './entities/maker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Maker])],
  controllers: [MakersController],
  providers: [MakersService]
})
export class MakersModule {}
