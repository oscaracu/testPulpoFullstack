import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'App de gestión de vehículos Elaborada por Oscar Cu para getPulpo.';
  }
}
