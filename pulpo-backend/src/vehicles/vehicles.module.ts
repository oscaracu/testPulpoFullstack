import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Maker } from 'src/makers/entities/maker.entity';
import { Color } from 'src/colors/entities/color.entity';
import { Novelty } from 'src/novelties/entities/novelty.entity';
import { VehicleSubscriber } from './vehicles.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Novelty, Maker, Color])],
  controllers: [VehiclesController],
  providers: [VehiclesService, VehicleSubscriber]
})
export class VehiclesModule {}
