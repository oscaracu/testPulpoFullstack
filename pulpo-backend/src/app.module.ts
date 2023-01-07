import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MakersModule } from './makers/makers.module';
import { ColorsModule } from './colors/colors.module';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Maker } from './makers/entities/maker.entity';
import { Color } from './colors/entities/color.entity';
import { NoveltiesModule } from './novelties/novelties.module';
import { Novelty } from './novelties/entities/novelty.entity';
import { NoveltiesCategoriesModule } from './novelties-categories/novelties-categories.module';
import { NoveltiesCategory } from './novelties-categories/entities/novelties-category.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    VehiclesModule,
    MakersModule,
    ColorsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: 'pulpo',
      entities: [Vehicle, Maker, Color, Novelty, NoveltiesCategory],
      synchronize: true,
    }),
    NoveltiesModule,
    NoveltiesCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
