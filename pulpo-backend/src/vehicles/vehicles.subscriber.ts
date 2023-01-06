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

  afterUpdate(event: UpdateEvent<Vehicle>): void | Promise<any> {
    const vehicle = event.entity;
    let description: string = '';
    for (let field in vehicle) {
      switch (field) {
        case 'color':
          if (vehicle[field] !== undefined) {
            description += `Vehicle color has been updated to color ${vehicle[field]}. `;
          }
          break;

        case 'make':
          if (vehicle[field] !== undefined) {
            description += `Vehicle make has been updated to ${vehicle[field]}. `;
          }
          break;

        case 'model':
          if (vehicle[field] !== undefined) {
            description += `Vehicle model has been updated to ${vehicle[field]}. `;
          }
          break;

        case 'isActive':
          if (vehicle[field] !== undefined) {
            if (vehicle[field]) {
              description += 'The vehicle has been activated. ';
            } else {
              description += 'The vehicle has been deactivated. ';
            }
          }
          break;

        case 'isAssigned':
          if (vehicle[field] !== undefined) {
            if (vehicle[field]) {
              description += 'The vehicle has been assigned. ';
            } else {
              description += 'The vehicle has been unassigned. ';
            }
          }
          break;

        default:
          break;
      }
    }
    const novelty: CreateNoveltyDto = { description };
    this.vehiclesService.createNovelties(event.entity.id, novelty);
  }
}
