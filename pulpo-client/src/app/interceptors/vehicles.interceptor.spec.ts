import { TestBed } from '@angular/core/testing';

import { VehiclesInterceptor } from './vehicles.interceptor';

describe('VehiclesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      VehiclesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: VehiclesInterceptor = TestBed.inject(VehiclesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
