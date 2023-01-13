import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from 'src/colors/entities/color.entity';
import { Maker } from 'src/makers/entities/maker.entity';
import { CreateNoveltyDto } from 'src/novelties/dto/create-novelty.dto';
import { Novelty } from 'src/novelties/entities/novelty.entity';
import { ILike, Repository } from 'typeorm';
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
    private colorsRepository: Repository<Color>,
    @InjectRepository(Novelty)
    private noveltiesRepository: Repository<Novelty>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehiclesRepository.create({
      make: createVehicleDto.make,
      model: createVehicleDto.model,
      color: createVehicleDto.color,
      admissionDate: createVehicleDto.admissionDate,
      isActive: createVehicleDto.isActive,
      isAssigned: createVehicleDto.isAssigned,
    });

    return await this.vehiclesRepository.save(vehicle);
  }

  async findAll(queries): Promise<Vehicle[]> {
    try {
      let color: string | null;
      let make: string | null;
      let model: number | null;

      if (Object.keys(queries).length > 0) {
        if (queries.hasOwnProperty('search')) {
          const colorMatch = await this.colorsRepository.find({
            where: { name: ILike(`%${queries.search}%`) },
          });
          const makeMatch = await this.makersRepository.find({
            where: { name: ILike(`%${queries.search}%`) },
          });

          if (colorMatch.length > 0) {
            color = colorMatch[0].name;
          } else if (makeMatch.length > 0) {
            make = makeMatch[0].name;
          } else {
            model = queries.search;
          }
        }

        return await this.vehiclesRepository.find({
          relations: {
            make: true,
            color: true,
            novelties: true,
          },
          where: {
            make: { id: parseQuery(queries.make), name: make },
            model: parseQuery(queries.model || model),
            color: { id: parseQuery(queries.color), name: color },
            isActive: parseQuery(queries.isActive),
            isAssigned: parseQuery(queries.isAssigned),
            novelties: {
              noveltiesCategoryId: parseQuery(queries.noveltiesCategory),
            },
          },

          order: parseSort(queries.order, queries.sort),
        });
      }
      return await this.vehiclesRepository.find({
        relations: {
          make: true,
          color: true,
          novelties: true,
        },
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createNovelties(
    id: number,
    createNoveltyDto: CreateNoveltyDto,
  ): Promise<Vehicle> {
    const novelty = new Novelty();
    novelty.vehicleId = id;
    novelty.noveltiesCategoryId = createNoveltyDto.noveltiesCategoryId;
    novelty.description = createNoveltyDto.description;
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id },
      relations: {
        novelties: true,
      },
    });
    vehicle.novelties.push(novelty);
    return await this.vehiclesRepository.save(vehicle);
  }

  async findOne(id: number): Promise<Vehicle> {
    return await this.vehiclesRepository.findOne({
      where: { id },
      relations: {
        color: true,
        make: true,
        novelties: true,
      },
    });
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicleToUpdate = await this.vehiclesRepository.findOneBy({ id: id });
    vehicleToUpdate.make = updateVehicleDto.make;
    vehicleToUpdate.color = updateVehicleDto.color;
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

function parseQuery(query) {
  switch (query) {
    case undefined:
    case '':
      return null;

    case 'true':
    case 'false':
      return query;
    default:
      break;
  }
  if (isNaN(query)) {
    return 0;
  }

  return query;
}

function parseSort(
  order: string,
  sort: string,
): import('typeorm').FindOptionsOrder<Vehicle> {
  switch (order) {
    case 'make':
    case 'color':
      return { [order]: { name: sort } };
    case 'model':
    case 'admissionDate':
    case 'updateDate':
      return { [order]: sort };

    default:
      return null;
  }
}
