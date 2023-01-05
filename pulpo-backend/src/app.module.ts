import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { VehiclesModule } from './vehicles/vehicles.module';
import { MakersModule } from './makers/makers.module';
import { ColorsModule } from './colors/colors.module';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Maker } from './makers/entities/maker.entity';
import { Color } from './colors/entities/color.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    VehiclesModule, MakersModule, ColorsModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'pulpo',
    entities: [Vehicle, Maker, Color],
    synchronize: true,
  }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
