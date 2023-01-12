import { TestBed } from '@angular/core/testing';

import { VehiclesServiceService } from './vehicles-service.service';

describe('VehiclesServiceService', () => {
  let service: VehiclesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
