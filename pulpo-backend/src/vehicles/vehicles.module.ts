import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Maker } from 'src/makers/entities/maker.entity';
import { Color } from 'src/colors/entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), TypeOrmModule.forFeature([Maker]), TypeOrmModule.forFeature([Color])],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {}
