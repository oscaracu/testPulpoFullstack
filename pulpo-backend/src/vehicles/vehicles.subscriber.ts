import { CreateNoveltyDto } from 'src/novelties/dto/create-novelty.dto';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@EventSubscriber()
export class VehicleSubscriber implements EntitySubscriberInterface<Vehicle> {
  constructor(
    dataSource: DataSource,
    private readonly vehiclesService: VehiclesService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo(): string | Function {
    return Vehicle;
  }

  async afterUpdate(event: UpdateEvent<Vehicle>): Promise<any> {
    const vehicle = event.entity;
    const id: number = vehicle.id;
    let description: string = '';
    let noveltiesCategoryId: number;
    for (let field in vehicle) {
      switch (field) {
        case 'color':
          if (vehicle[field] !== undefined) {
            noveltiesCategoryId = 1;
            description = 'Vehicle color has been updated';
            const novelty: CreateNoveltyDto = {
              noveltiesCategoryId,
              description,
            };
            await this.vehiclesService.createNovelties(id, novelty);
          }
          break;

        case 'make':
          if (vehicle[field] !== undefined) {
            noveltiesCategoryId = 1;
            description = 'Vehicle make has been updated';
            const novelty: CreateNoveltyDto = {
              noveltiesCategoryId,
              description,
            };
            await this.vehiclesService.createNovelties(id, novelty);
          }
          break;

        case 'model':
          if (vehicle[field] !== undefined) {
            noveltiesCategoryId = 1;
            description = `Vehicle model has been updated to ${vehicle[field]}.`;
            const novelty: CreateNoveltyDto = {
              noveltiesCategoryId,
              description,
            };
            await this.vehiclesService.createNovelties(id, novelty);
          }
          break;

        case 'isActive':
          if (vehicle[field] !== undefined) {
            if (vehicle[field]) {
              noveltiesCategoryId = 2;
              description = 'The vehicle has been activated.';
              const novelty: CreateNoveltyDto = {
                noveltiesCategoryId,
                description,
              };
              await this.vehiclesService.createNovelties(id, novelty);
            } else {
              noveltiesCategoryId = 2;
              description = 'The vehicle has been deactivated.';
              const novelty: CreateNoveltyDto = {
                noveltiesCategoryId,
                description,
              };
              await this.vehiclesService.createNovelties(id, novelty);
            }
          }
          break;

        case 'isAssigned':
          if (vehicle[field] !== undefined) {
            if (vehicle[field]) {
              noveltiesCategoryId = 2;
              description = 'The vehicle has been assigned.';
              const novelty: CreateNoveltyDto = {
                noveltiesCategoryId,
                description,
              };
              await this.vehiclesService.createNovelties(id, novelty);
            } else {
              noveltiesCategoryId = 2;
              description = 'The vehicle has been unassigned.';
              const novelty: CreateNoveltyDto = {
                noveltiesCategoryId,
                description,
              };
              await this.vehiclesService.createNovelties(id, novelty);
            }
          }
          break;

        default:
          break;
      }
    }
  }
}
