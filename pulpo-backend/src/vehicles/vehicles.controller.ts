import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { CreateNoveltyDto } from 'src/novelties/dto/create-novelty.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolNames } from 'src/roles/roles.enum';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Roles(RolNames.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Roles(RolNames.ADMIN, RolNames.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  findAll(@Query() queries): Promise<Vehicle[]> {
    return this.vehiclesService.findAll(queries);
  }

  @Roles(RolNames.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/novelties')
  createNovelties(
    @Param('id') id: string,
    @Body() createNoveltyDto: CreateNoveltyDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.createNovelties(+id, createNoveltyDto);
  }

  @Roles(RolNames.ADMIN, RolNames.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(+id);
  }

  @Roles(RolNames.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Roles(RolNames.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
