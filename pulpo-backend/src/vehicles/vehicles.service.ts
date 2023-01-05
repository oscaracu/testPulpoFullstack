import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from 'src/colors/entities/color.entity';
import { Maker } from 'src/makers/entities/maker.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Maker)
    private makersRepository: Repository<Maker>,
    @InjectRepository(Color)
    private colorsRepository: Repository<Color>
  ) {}
  
  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const make = await this.makersRepository.findOneBy({id:createVehicleDto.make});
    const color = await this.colorsRepository.findOneBy({id:createVehicleDto.color});
    const vehicle = this.vehiclesRepository.create({
      make,
      model: createVehicleDto.model,
      color,
      admissionDate: createVehicleDto.admissionDate,
      isActive: createVehicleDto.isActive,
      isAssigned: createVehicleDto.isAssigned
    });
    
    return await this.vehiclesRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find({
      relations: {
        make: true,
        color: true
      }
    });
  }
  
  // Esperando respuesta acerca de la funcionalidad
  findNovelties() {
    return 'This action returns all novelties';
  }

  findOne(id: number): Promise<Vehicle> {
    return this.vehiclesRepository.findOne({
      where: {id},
      relations: {
        color: true,
        make: true
      }});
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const make = await this.makersRepository.findOneBy({id:updateVehicleDto.make});
    const color = await this.colorsRepository.findOneBy({id:updateVehicleDto.color});
    const vehicleToUpdate = await this.vehiclesRepository.findOneBy({id:id});
    vehicleToUpdate.make = make;
    vehicleToUpdate.color = color;
    vehicleToUpdate.model = updateVehicleDto.model;
    vehicleToUpdate.admissionDate = updateVehicleDto.admissionDate;
    vehicleToUpdate.isActive = updateVehicleDto.isActive;
    vehicleToUpdate.isAssigned = updateVehicleDto.isAssigned;

    return await this.vehiclesRepository.save(vehicleToUpdate);
  }

  async remove(id: number): Promise<void> {
    await this.vehiclesRepository.delete(id);
  }
}
